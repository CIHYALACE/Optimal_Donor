import { Route, Router, Routes } from "react-router-dom";
import "../style/App.css";
import SharedLayout from "../sharedlayout/SharedLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import UserProfile from "../pages/UserProfile";
import CampaignsPage from "../pages/CampaignsPage";
import CampaignDetailsPage from "../pages/CampaignDetailsPage";
import AboutPage from "../pages/About";
import CampaignCreationPage from "../pages/CampaignCreationPage";
import Activate from "../pages/Activate";
import ResetPassword from "../pages/ResetPassword";
import ResetPasswordConfirm from "../pages/ResetPasswordConfirm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/activate/:uid/:token" element={<Activate />} />
        <Route path="/users/activate/:uid/:token" element={<Activate />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/password/reset/confirm/:uid/:token"
          element={<ResetPasswordConfirm />}
        />
        <Route path="/profile/" element={<UserProfile />} />
        <Route path="/campaigns" element={<CampaignsPage />} />
        <Route path="/campaigns/:id" element={<CampaignDetailsPage />} />
        <Route path="/campaigns/create" element={<CampaignCreationPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<h1>404</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
