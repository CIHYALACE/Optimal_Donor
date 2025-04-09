import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, ENDPOINTS } from '../../api/constants';

const API_URL = `${ENDPOINTS.RATINGS}/`;

// Async thunks
export const fetchCampaignRatings = createAsyncThunk(
  'ratings/fetchCampaignRatings',
  async (campaignId, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL, { 
        params: { campaign: campaignId } 
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch ratings');
    }
  }
);

export const fetchUserRatings = createAsyncThunk(
  'ratings/fetchUserRatings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch user ratings');
    }
  }
);

export const createRating = createAsyncThunk(
  'ratings/createRating',
  async (ratingData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, ratingData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create rating');
    }
  }
);

export const updateRating = createAsyncThunk(
  'ratings/updateRating',
  async ({ ratingId, ratingData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_URL}${ratingId}/`, ratingData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update rating');
    }
  }
);

export const deleteRating = createAsyncThunk(
  'ratings/deleteRating',
  async (ratingId, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}${ratingId}/`);
      return ratingId;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to delete rating');
    }
  }
);

// Slice
const ratingsSlice = createSlice({
  name: 'ratings',
  initialState: {
    campaignRatings: [],
    userRatings: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearRatingError: (state) => {
      state.error = null;
    },
    clearRatingSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch campaign ratings
      .addCase(fetchCampaignRatings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCampaignRatings.fulfilled, (state, action) => {
        state.loading = false;
        state.campaignRatings = action.payload;
      })
      .addCase(fetchCampaignRatings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch user ratings
      .addCase(fetchUserRatings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserRatings.fulfilled, (state, action) => {
        state.loading = false;
        state.userRatings = action.payload;
      })
      .addCase(fetchUserRatings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create rating
      .addCase(createRating.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createRating.fulfilled, (state, action) => {
        state.loading = false;
        state.userRatings.push(action.payload);
        // Update campaign ratings if we're viewing that campaign
        const campaignId = action.payload.campaign;
        if (state.campaignRatings.length > 0 && 
            state.campaignRatings[0].campaign === campaignId) {
          state.campaignRatings.push(action.payload);
        }
        state.success = true;
      })
      .addCase(createRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update rating
      .addCase(updateRating.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateRating.fulfilled, (state, action) => {
        state.loading = false;
        // Update in user ratings
        state.userRatings = state.userRatings.map(rating => 
          rating.id === action.payload.id ? action.payload : rating
        );
        // Update in campaign ratings if applicable
        state.campaignRatings = state.campaignRatings.map(rating => 
          rating.id === action.payload.id ? action.payload : rating
        );
        state.success = true;
      })
      .addCase(updateRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete rating
      .addCase(deleteRating.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteRating.fulfilled, (state, action) => {
        state.loading = false;
        // Remove from user ratings
        state.userRatings = state.userRatings.filter(
          rating => rating.id !== action.payload
        );
        // Remove from campaign ratings if applicable
        state.campaignRatings = state.campaignRatings.filter(
          rating => rating.id !== action.payload
        );
        state.success = true;
      })
      .addCase(deleteRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearRatingError, clearRatingSuccess } = ratingsSlice.actions;
export default ratingsSlice.reducer;
