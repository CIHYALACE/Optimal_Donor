import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/usersSlice';
import authReducer from './slices/authSlice';
import campaignsReducer from './slices/campaignsSlice';
import donationsReducer from './slices/donationsSlice';
import categoriesReducer from './slices/categoriesSlice';
import tagsReducer from './slices/tagsSlice';
import commentsReducer from './slices/commentsSlice';
import ratingsReducer from './slices/ratingsSlice';
import reportsReducer from './slices/reportsSlice';
import latestCampaignsReducer from './slices/latestCampaignsSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    auth: authReducer,
    campaigns: campaignsReducer,
    donations: donationsReducer,
    categories: categoriesReducer,
    tags: tagsReducer,
    comments: commentsReducer,
    ratings: ratingsReducer,
    reports: reportsReducer,
    latestCampaigns: latestCampaignsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
