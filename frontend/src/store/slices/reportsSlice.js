import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, ENDPOINTS } from '../../api/constants';

const API_URL = `${ENDPOINTS.REPORTS}/`;

// Async thunks
export const fetchUserReports = createAsyncThunk(
  'reports/fetchUserReports',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch reports');
    }
  }
);

export const createReport = createAsyncThunk(
  'reports/createReport',
  async (reportData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, reportData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create report');
    }
  }
);

export const updateReport = createAsyncThunk(
  'reports/updateReport',
  async ({ reportId, reportData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_URL}${reportId}/`, reportData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update report');
    }
  }
);

export const deleteReport = createAsyncThunk(
  'reports/deleteReport',
  async (reportId, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}${reportId}/`);
      return reportId;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to delete report');
    }
  }
);

// Slice
const reportsSlice = createSlice({
  name: 'reports',
  initialState: {
    reports: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearReportError: (state) => {
      state.error = null;
    },
    clearReportSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch user reports
      .addCase(fetchUserReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserReports.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = action.payload;
      })
      .addCase(fetchUserReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create report
      .addCase(createReport.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createReport.fulfilled, (state, action) => {
        state.loading = false;
        state.reports.push(action.payload);
        state.success = true;
      })
      .addCase(createReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update report
      .addCase(updateReport.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateReport.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = state.reports.map(report => 
          report.id === action.payload.id ? action.payload : report
        );
        state.success = true;
      })
      .addCase(updateReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete report
      .addCase(deleteReport.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteReport.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = state.reports.filter(
          report => report.id !== action.payload
        );
        state.success = true;
      })
      .addCase(deleteReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearReportError, clearReportSuccess } = reportsSlice.actions;
export default reportsSlice.reducer;
