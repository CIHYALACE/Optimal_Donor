import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, ENDPOINTS } from '../../api/constants';

const API_URL = `${ENDPOINTS.CAMPAIGNS}/`;

// Async thunks
export const fetchCampaigns = createAsyncThunk(
  'campaigns/fetchCampaigns',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL, { params: filters });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch campaigns');
    }
  }
);

export const fetchCampaignById = createAsyncThunk(
  'campaigns/fetchCampaignById',
  async (campaignId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}${campaignId}/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch campaign');
    }
  }
);

export const createCampaign = createAsyncThunk(
  'campaigns/createCampaign',
  async (campaignData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, campaignData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create campaign');
    }
  }
);

export const updateCampaign = createAsyncThunk(
  'campaigns/updateCampaign',
  async ({ campaignId, campaignData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_URL}${campaignId}/`, campaignData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update campaign');
    }
  }
);

export const donateToCampaign = createAsyncThunk(
  'campaigns/donateToCampaign',
  async ({ campaignId, amount }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}${campaignId}/donate/`, { amount });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to process donation');
    }
  }
);

export const deleteCampaign = createAsyncThunk(
  'campaigns/deleteCampaign',
  async (campaignId, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}${campaignId}/`);
      return campaignId;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to delete campaign');
    }
  }
);

export const uploadCampaignImage = createAsyncThunk(
  'campaigns/uploadCampaignImage',
  async ({ campaignId, imageData }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('image', imageData);
      formData.append('campaign', campaignId);
      
      const response = await axios.post(`${ENDPOINTS.CAMPAIGN_IMAGES}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to upload image');
    }
  }
);

// Slice
const campaignsSlice = createSlice({
  name: 'campaigns',
  initialState: {
    campaigns: [],
    currentCampaign: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearCampaignError: (state) => {
      state.error = null;
    },
    clearCampaignSuccess: (state) => {
      state.success = false;
    },
    clearCurrentCampaign: (state) => {
      state.currentCampaign = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch campaigns
      .addCase(fetchCampaigns.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCampaigns.fulfilled, (state, action) => {
        state.loading = false;
        state.campaigns = action.payload;
      })
      .addCase(fetchCampaigns.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch campaign by ID
      .addCase(fetchCampaignById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCampaignById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCampaign = action.payload;
      })
      .addCase(fetchCampaignById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create campaign
      .addCase(createCampaign.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createCampaign.fulfilled, (state, action) => {
        state.loading = false;
        // Ensure proper category assignment
        if (action.payload.category) {
          state.campaigns = [action.payload, ...state.campaigns];
        }
        state.currentCampaign = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(createCampaign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update campaign
      .addCase(updateCampaign.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateCampaign.fulfilled, (state, action) => {
        state.loading = false;
        state.campaigns = state.campaigns.map(campaign => 
          campaign.id === action.payload.id ? action.payload : campaign
        );
        state.currentCampaign = action.payload;
        state.success = true;
      })
      .addCase(updateCampaign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      
      
      // Delete campaign
      .addCase(deleteCampaign.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCampaign.fulfilled, (state, action) => {
        state.loading = false;
        state.campaigns = state.campaigns.filter(
          campaign => campaign.id !== action.payload
        );
        if (state.currentCampaign && state.currentCampaign.id === action.payload) {
          state.currentCampaign = null;
        }
        state.success = true;
      })
      .addCase(deleteCampaign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Upload campaign image
      .addCase(uploadCampaignImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadCampaignImage.fulfilled, (state, action) => {
        state.loading = false;
        // If we have the current campaign loaded, update its images
        if (state.currentCampaign && state.currentCampaign.id === action.payload.campaign) {
          if (!state.currentCampaign.images) {
            state.currentCampaign.images = [];
          }
          state.currentCampaign.images.push(action.payload);
        }
        state.success = true;
      })
      .addCase(uploadCampaignImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { 
  clearCampaignError, 
  clearCampaignSuccess, 
  clearCurrentCampaign 
} = campaignsSlice.actions;

export default campaignsSlice.reducer;
