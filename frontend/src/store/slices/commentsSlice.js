import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, ENDPOINTS } from '../../api/constants';

const API_URL = `${ENDPOINTS.COMMENTS}/`;

// Async thunks
export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (campaignId, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL, { 
        params: { campaign: campaignId } 
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch comments');
    }
  }
);

export const createComment = createAsyncThunk(
  'comments/createComment',
  async (commentData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, commentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create comment');
    }
  }
);

export const updateComment = createAsyncThunk(
  'comments/updateComment',
  async ({ commentId, commentData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_URL}${commentId}/`, commentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update comment');
    }
  }
);

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}${commentId}/`);
      return commentId;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to delete comment');
    }
  }
);

// Slice
const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearCommentError: (state) => {
      state.error = null;
    },
    clearCommentSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch comments
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create comment
      .addCase(createComment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.push(action.payload);
        state.success = true;
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update comment
      .addCase(updateComment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = state.comments.map(comment => 
          comment.id === action.payload.id ? action.payload : comment
        );
        state.success = true;
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete comment
      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = state.comments.filter(
          comment => comment.id !== action.payload
        );
        state.success = true;
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCommentError, clearCommentSuccess } = commentsSlice.actions;
export default commentsSlice.reducer;
