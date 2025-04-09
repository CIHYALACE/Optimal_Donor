import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, ENDPOINTS } from '../../api/constants';

const API_URL = `${ENDPOINTS.TAGS}/`;

// Async thunks
export const fetchTags = createAsyncThunk(
  'tags/fetchTags',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch tags');
    }
  }
);

export const createTag = createAsyncThunk(
  'tags/createTag',
  async (tagData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, tagData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create tag');
    }
  }
);

export const updateTag = createAsyncThunk(
  'tags/updateTag',
  async ({ tagId, tagData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_URL}${tagId}/`, tagData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update tag');
    }
  }
);

export const deleteTag = createAsyncThunk(
  'tags/deleteTag',
  async (tagId, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}${tagId}/`);
      return tagId;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to delete tag');
    }
  }
);

// Slice
const tagsSlice = createSlice({
  name: 'tags',
  initialState: {
    tags: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearTagError: (state) => {
      state.error = null;
    },
    clearTagSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch tags
      .addCase(fetchTags.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.loading = false;
        state.tags = action.payload;
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create tag
      .addCase(createTag.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createTag.fulfilled, (state, action) => {
        state.loading = false;
        state.tags.push(action.payload);
        state.success = true;
      })
      .addCase(createTag.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update tag
      .addCase(updateTag.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateTag.fulfilled, (state, action) => {
        state.loading = false;
        state.tags = state.tags.map(tag => 
          tag.id === action.payload.id ? action.payload : tag
        );
        state.success = true;
      })
      .addCase(updateTag.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete tag
      .addCase(deleteTag.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteTag.fulfilled, (state, action) => {
        state.loading = false;
        state.tags = state.tags.filter(
          tag => tag.id !== action.payload
        );
        state.success = true;
      })
      .addCase(deleteTag.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearTagError, clearTagSuccess } = tagsSlice.actions;
export default tagsSlice.reducer;
