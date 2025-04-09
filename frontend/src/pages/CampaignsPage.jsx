import Card3 from "../components/Card3";
import CampaignsSection from "../components/CampaignsSection";
import { fetchCampaigns } from "../store/slices/campaignsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function CampaignsPage() {
  const dispatch = useDispatch();
  const { campaigns, loading, error } = useSelector(state => state.campaigns);
  
  useEffect(() => {
    dispatch(fetchCampaigns());
  }, [dispatch]);
  
  // Filter campaigns by category
  const medicalCampaigns = campaigns.filter(campaign => campaign.category?.name === 'Medical');
  const educationCampaigns = campaigns.filter(campaign => campaign.category?.name === 'Education');
  const animalsCampaigns = campaigns.filter(campaign => campaign.category?.name === 'Animals');
  const businessCampaigns = campaigns.filter(campaign => campaign.category?.name === 'Business');
  const emergencyCampaigns = campaigns.filter(campaign => campaign.category?.name === 'Emergency');
  
=======
  const categories = [
    {
      id: "education",
      name: "Education",
      icon: "fa-solid fa-graduation-cap"
    },
    {
      id: "animals", 
      name: "Animals",
      icon: "fa-solid fa-shield-dog"
    },
    {
      id: "medical",
      name: "Medical", 
      icon: "fa-solid fa-heart"
    },
    {
      id: "business",
      name: "Business",
      icon: "fa-solid fa-building"
    },
    {
      id: "emergency",
      name: "Emergency",
      icon: "fa-solid fa-umbrella" 
    }
  ];

>>>>>>> 6703edfe5e77c4f2bebbf9905a5eaf72a2e56244
  return (
    <div className="container mt-5 mb-5">
      {loading && <div className="text-center"><div className="spinner-border" role="status"></div></div>}
      {error && <div className="alert alert-danger">{error}</div>}
      
      <div className="col-12 col-md-7 mb-5">
        <h1 className="fs-bigger gidole-regular">
          Browse fundraisers by category
        </h1>
        <p className="fs-5 gidole-regular text-muted">
          People around the world are raising money for what they are passionate
          about.
        </p>
        <a className="btn btn-success fw-bold p-2 px-4">Donate Now</a>
      </div>

      <div className="d-flex justify-content-between align-items-center gap-1 mt-5">
        <Card3 name="Education" icon="fa-solid fa-graduation-cap" />
        <Card3 name="Animals" icon="fa-solid fa-shield-dog" />
        <Card3 name="Medical" icon="fa-solid fa-heart" />
        <Card3 name="Business" icon="fa-solid fa-building" />
        <Card3 name="Emergency" icon="fa-solid fa-umbrella" />
      </div>
      
      {campaigns.length === 0 && !loading ? (
        <div className="alert alert-info mt-4">No campaigns available at the moment.</div>
      ) : (
        <>
          <hr />
          <div>
            <CampaignsSection name="Medical Campaigns" campaigns={medicalCampaigns} />
          </div>
          <hr />
          <div>
            <CampaignsSection name="Education Campaigns" campaigns={educationCampaigns} />
          </div>
          <hr />
          <div>
            <CampaignsSection name="Animals Campaigns" campaigns={animalsCampaigns} />
          </div>
          <hr />
          <div>
            <CampaignsSection name="Business Campaigns" campaigns={businessCampaigns} />
          </div>
          <hr />
          <div>
            <CampaignsSection name="Emergency Campaigns" campaigns={emergencyCampaigns} />
          </div>
          <div>
            <CampaignsSection name="All Campaigns" campaigns={campaigns} />
          </div>
        </>
      )}
    </div>
  );
}
