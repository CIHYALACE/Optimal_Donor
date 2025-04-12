import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ENDPOINTS } from '../../api/constants';

const API_URL = `${ENDPOINTS.LATEST_CAMPAIGNS}/`;

// Async thunks
export const fetchLatestCampaigns = createAsyncThunk(
  'latestCampaigns/fetchLatestCampaigns',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch latest campaigns');
    }
  }
);

// Slice
const latestCampaignsSlice = createSlice({
  name: 'latestCampaigns',
  initialState: {
    latestCampaigns: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearLatestCampaignsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch latest campaigns
      .addCase(fetchLatestCampaigns.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLatestCampaigns.fulfilled, (state, action) => {
        state.loading = false;
        state.latestCampaigns = action.payload;
      })
      .addCase(fetchLatestCampaigns.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearLatestCampaignsError } = latestCampaignsSlice.actions;

export default latestCampaignsSlice.reducer;