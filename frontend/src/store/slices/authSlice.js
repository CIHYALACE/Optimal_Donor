import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, ENDPOINTS } from "../../api/constants";

// Load user (if token exists)
export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return thunkAPI.rejectWithValue("No token found");

      const response = await axios.get(`${BASE_URL}/users/me/`, {
        headers: { Authorization: `Token ${token}` },
      });

      return response.data; // User data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async thunks
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(ENDPOINTS.AUTH.TOKEN, credentials);
      // Store tokens in local storage
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);

      // Set default authorization header for all future requests
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.access}`;

      // Fetch user data
      const userResponse = await axios.get(ENDPOINTS.AUTH.ME);
      return { tokens: response.data, user: userResponse.data };
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Login failed"
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(ENDPOINTS.AUTH.USERS, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Registration failed"
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      // Clear tokens from local storage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      // Remove authorization header
      delete axios.defaults.headers.common["Authorization"];

      return null;
    } catch (error) {
      return rejectWithValue("Logout failed");
    }
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      return rejectWithValue("No refresh token available");
    }

    try {
      const response = await axios.post(ENDPOINTS.AUTH.REFRESH, {
        refresh: refreshToken,
      });
      localStorage.setItem("accessToken", response.data.access);

      // Update authorization header
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.access}`;

      return response.data;
    } catch (error) {
      // If refresh token is invalid, log the user out
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      delete axios.defaults.headers.common["Authorization"];

      return rejectWithValue(
        error.response ? error.response.data : "Token refresh failed"
      );
    }
  }
);

// Account activation
export const activateAccount = createAsyncThunk(
  "auth/activateAccount",
  async (activationData, { rejectWithValue }) => {
    try {
      // Make sure we're sending exactly the format Djoser expects
      const response = await axios.post(ENDPOINTS.AUTH.ACTIVATION, {
        uid: activationData.uid,
        token: activationData.token,
      });
      return { success: true };
    } catch (error) {
      console.error("Activation error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || "Activation failed");
    }
  }
);

// Request password reset
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (email, { rejectWithValue }) => {
    try {
      await axios.post(ENDPOINTS.AUTH.RESET_PASSWORD, { email });
      return { success: true };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Password reset request failed"
      );
    }
  }
);

// Confirm password reset
export const resetPasswordConfirm = createAsyncThunk(
  "auth/resetPasswordConfirm",
  async (resetData, { rejectWithValue }) => {
    try {
      await axios.post(ENDPOINTS.AUTH.RESET_PASSWORD_CONFIRM, resetData);
      return { success: true };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Password reset confirmation failed"
      );
    }
  }
);

// Initialize auth state
const initialState = {
  user: null,
  isAuthenticated: !!localStorage.getItem("accessToken"),
  loading: false,
  error: null,
};

// Setup axios with stored token if it exists
const token = localStorage.getItem("accessToken");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearAuthState: (state) => {
      state.loading = false;
      state.success = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })

      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        // We don't log the user in automatically after registration
        // They need to log in separately
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      })

      // Refresh token
      .addCase(refreshToken.fulfilled, (state) => {
        state.isAuthenticated = true;
      })
      .addCase(refreshToken.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      })

      // Account activation
      .addCase(activateAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(activateAccount.fulfilled, (state) => {
        state.loading = false;
        state.success = "Account activated successfully!";
      })
      .addCase(activateAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Activation failed";
      })

      // Password reset request
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.success = "Password reset email sent successfully!";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to send reset email";
      })

      // Password reset confirmation
      .addCase(resetPasswordConfirm.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(resetPasswordConfirm.fulfilled, (state) => {
        state.loading = false;
        state.success = "Password has been reset successfully!";
      })
      .addCase(resetPasswordConfirm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Password reset failed";
      });
  },
});

export const { clearError, clearAuthState } = authSlice.actions;
export default authSlice.reducer;
