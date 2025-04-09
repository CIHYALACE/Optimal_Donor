import Card3 from "../components/Card3";
import CampaignsSection from "../components/CampaignsSection";
import { fetchCampaigns } from "../store/slices/campaignsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function CampaignsPage() {
  const dispatch = useDispatch();
  const { allCampaigns, loading, error } = useSelector(state => state.campaigns);
  
  useEffect(() => {
    dispatch(fetchCampaigns());
  }, [dispatch]);
  
  // Filter campaigns by category
  const categories = [
    {
      id: "education",
      name: "Education",
      icon: "fa-solid fa-graduation-cap",
      campaigns: allCampaigns.filter(campaign => campaign.category?.name === 'Education')
    },
    {
      id: "animals", 
      name: "Animals",
      icon: "fa-solid fa-shield-dog",
      campaigns: allCampaigns.filter(campaign => campaign.category?.name === 'Animals')
    },
    {
      id: "medical",
      name: "Medical", 
      icon: "fa-solid fa-heart",
      campaigns: allCampaigns.filter(campaign => campaign.category?.name === 'Medical')
    },
    {
      id: "business",
      name: "Business",
      icon: "fa-solid fa-building",
      campaigns: allCampaigns.filter(campaign => campaign.category?.name === 'Business')
    },
    {
      id: "emergency",
      name: "Emergency",
      icon: "fa-solid fa-umbrella",
      campaigns: allCampaigns.filter(campaign => campaign.category?.name === 'Emergency')
    },
    {
      id: "other",
      name: "Other",
      icon: "fa-solid fa-",
      campaigns: allCampaigns.filter(campaign => !['Education', 'Animals', 'Medical', 'Business', 'Emergency'].includes(campaign.category?.name))
    }
  ];

  return (
    <div className="container mt-5 mb-5">
      {loading && <div className="text-center"><div className="spinner-border" role="status"></div></div>}
      {error && <div className="alert alert-danger">{error}</div>}
      
      <div className="col-12 col-md-7 mb-5">
        <h1 className="fs-bigger gidole-regular">
          Browse fundraisers by category
        </h1>
        <p className="fs-5 gidole-regular text-muted">
          People around the world are raising money for what they are passionate about.
        </p>
      </div>

      <div className="d-flex justify-content-between align-items-center gap-1 mt-5">
        {categories.map(category => (
          <Card3 
            key={category.id}
            id={`#${category.id}`}
            name={category.name}
            icon={category.icon}
          />
        ))}
      </div>
      <hr />

      {categories.map(category => (
        <div key={category.id} id={category.id}>
          <CampaignsSection name={`${category.name} Campaigns`} campaigns={category.campaigns} />
          <hr />
        </div>
      ))}
      
    </div>
  );
}