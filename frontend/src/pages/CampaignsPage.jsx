import Card3 from "../components/Card3";
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampaigns } from '../store/slices/campaignsSlice';
import CampaignsSection from '../components/CampaignsSection';

export default function CampaignsPage() {
  const dispatch = useDispatch();
  const { campaigns, loading, error } = useSelector(state => state.campaigns);
  
  useEffect(() => {
    dispatch(fetchCampaigns());
  }, [dispatch]);
  
  // Known category order (for prioritizing display)
  const knownCategoryOrder = ['medical', 'education', 'animals', 'business', 'emergency'];
  
  // Extract unique categories from campaigns data
  const uniqueCategories = useMemo(() => {
    const categoryMap = new Map();
    
    // Process all campaigns to build category map
    campaigns.forEach(campaign => {
      if (campaign.category && campaign.category.name) {
        const categoryName = campaign.category.name;
        const categoryId = categoryName.toLowerCase();
        
        if (!categoryMap.has(categoryId)) {
          categoryMap.set(categoryId, {
            id: categoryId,
            name: categoryName,
            icon: getCategoryIcon(categoryName),
            campaigns: [],
            // Add a sortOrder property to determine display order
            sortOrder: knownCategoryOrder.indexOf(categoryId)
          });
        }
        
        categoryMap.get(categoryId).campaigns.push(campaign);
      }
    });
    
    // Convert to array and sort
    return Array.from(categoryMap.values())
      .sort((a, b) => {
        // Known categories (those in knownCategoryOrder) come first in their defined order
        if (a.sortOrder !== -1 && b.sortOrder !== -1) {
          return a.sortOrder - b.sortOrder; // Sort known categories by their order
        } else if (a.sortOrder !== -1) {
          return -1; // Known categories come before unknown ones
        } else if (b.sortOrder !== -1) {
          return 1; // Known categories come before unknown ones
        } else {
          // For unknown categories, sort alphabetically by name
          return a.name.localeCompare(b.name);
        }
      });
  }, [campaigns]);
  
  // Helper function to get appropriate icon for each category
  function getCategoryIcon(categoryName) {
    switch(categoryName.toLowerCase()) {
      case 'education':
        return 'fa-solid fa-graduation-cap';
      case 'animals':
        return 'fa-solid fa-shield-dog';
      case 'medical':
        return 'fa-solid fa-heart';
      case 'business':
        return 'fa-solid fa-building';
      case 'emergency':
        return 'fa-solid fa-umbrella';
      default:
        return 'fa-solid fa-hand-holding-heart'; // Default icon for any new categories
    }
  }

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

      {uniqueCategories.length > 0 ? (
        <>
          <div className="d-flex justify-content-between align-items-center gap-1 mt-5 flex-wrap">
            {uniqueCategories.map(category => (
              <Card3 
                key={category.id}
                id={`#${category.id}`}
                name={category.name}
                icon={category.icon}
              />
            ))}
          </div>
          <hr />

          {uniqueCategories.map(category => (
            <div key={category.id} id={category.id}>
              <CampaignsSection 
                name={`${category.name} Campaigns`} 
                campaigns={category.campaigns} 
              />
              <hr />
            </div>
          ))}
        </>
      ) : (
        !loading && (
          <div className="alert alert-info">
            No campaigns with categories found. Check back later for categorized campaigns.
          </div>
        )
      )}
    </div>
  );
}