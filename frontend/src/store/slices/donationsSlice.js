import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, ENDPOINTS } from '../../api/constants';

const API_URL = `${ENDPOINTS.DONATIONS}/`;

// Async thunks
export const fetchUserDonations = createAsyncThunk(
  'donations/fetchUserDonations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch donations');
    }
  }
);

export const fetchCampaignDonations = createAsyncThunk(
  'donations/fetchCampaignDonations',
  async (campaignId, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL, { 
        params: { campaign: campaignId } 
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch campaign donations');
    }
  }
);

export const createDonation = createAsyncThunk(
  'donations/createDonation',
  async (donationData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, donationData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create donation');
    }
  }
);

export const fetchDonationById = createAsyncThunk(
  'donations/fetchDonationById',
  async (donationId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}${donationId}/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch donation');
    }
  }
);

// Slice
const donationsSlice = createSlice({
  name: 'donations',
  initialState: {
    userDonations: [],
    campaignDonations: [],
    currentDonation: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearDonationError: (state) => {
      state.error = null;
    },
    clearDonationSuccess: (state) => {
      state.success = false;
    },
    clearCurrentDonation: (state) => {
      state.currentDonation = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch user donations
      .addCase(fetchUserDonations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDonations.fulfilled, (state, action) => {
        state.loading = false;
        state.userDonations = action.payload;
      })
      .addCase(fetchUserDonations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch campaign donations
      .addCase(fetchCampaignDonations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCampaignDonations.fulfilled, (state, action) => {
        state.loading = false;
        state.campaignDonations = action.payload;
      })
      .addCase(fetchCampaignDonations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create donation
      .addCase(createDonation.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createDonation.fulfilled, (state, action) => {
        state.loading = false;
        state.userDonations.push(action.payload);
        state.currentDonation = action.payload;
        state.success = true;
      })
      .addCase(createDonation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch donation by ID
      .addCase(fetchDonationById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDonationById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentDonation = action.payload;
      })
      .addCase(fetchDonationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { 
  clearDonationError, 
  clearDonationSuccess, 
  clearCurrentDonation 
} = donationsSlice.actions;

export default donationsSlice.reducer;
