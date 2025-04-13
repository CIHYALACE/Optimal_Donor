import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampaignById } from '../store/slices/campaignsSlice';
import ProgressBar from '../components/ProgressBar';

export default function CampaignDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentCampaign, loading, error } = useSelector(state => state.campaigns);
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [donationAmount, setDonationAmount] = useState('');

  useEffect(() => {
    if (id) {
      dispatch(fetchCampaignById(id));
    }
    
    // Clean up function to clear current campaign when unmounting
    return () => {
      // If needed, you could dispatch clearCurrentCampaign here
    };
  }, [dispatch, id]);

  // Format date to a readable string
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Calculate percentage of goal reached
  const calculateProgress = () => {
    if (!currentCampaign) return 0;
    return Math.min(
      Math.round((currentCampaign.raised_amount / currentCampaign.goal_amount) * 100),
      100
    );
  };

  // Get default image or first campaign image
  const getCampaignImage = () => {
    if (currentCampaign?.images && currentCampaign.images.length > 0) {
      return currentCampaign.images[0].image;
    }
    return "/cancer_card.jpg"; // Default image
  };

  const handleDonateClick = () => {
    setShowDonationForm(true);
  };

  const handleFormClose = () => {
    setShowDonationForm(false);
    setDonationAmount('');
  };

  const handleDonationSubmit = () => {
    // Handle donation submission logic here
    console.log(`Donating $${donationAmount} to campaign: ${currentCampaign.title}`);
    handleFormClose();
  };

  return (
    <div className="container mt-5 mb-5">
      {/* Loading and error states */}
      {loading && (
        <div className="text-center">
          <div className="spinner-border" role="status"></div>
        </div>
      )}
      
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Back to campaigns button */}
      <div className="mb-4">
        <Link to="/campaigns" className="btn btn-outline-success">
          <i className="fa-solid fa-arrow-left me-2"></i>
          Back to Campaigns
        </Link>
      </div>

      {/* Campaign details */}
      {!loading && currentCampaign && (
        <div className="row">
          {/* Left column - Image and donation info */}
          <div className="col-12 col-lg-7 mb-4">
            <div className="card border-0 shadow-sm border-top border-success border-2">
              <img 
                src={getCampaignImage()} 
                className="card-img-top img-fluid border-bottom border-success border-2" 
                alt={currentCampaign.title}
                style={{ maxHeight: '400px', objectFit: 'cover' }}
              />
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h1 className="card-title fs-2 fw-bold gidole-regular">{currentCampaign.title}</h1>
                  {currentCampaign.category && (
                    <span className="badge bg-success">
                      {currentCampaign.category.name}
                    </span>
                  )}
                </div>
                
                <div className="mb-4">
                  <ProgressBar 
                    currentAmount={currentCampaign.raised_amount} 
                    totalAmount={currentCampaign.goal_amount} 
                  />
                  <div className="d-flex justify-content-between mt-2">
                    <span className="fw-bold text-success">${currentCampaign.raised_amount} raised</span>
                    <span className="text-muted">Goal: ${currentCampaign.goal_amount}</span>
                  </div>
                </div>
                
                <div className="d-grid gap-2">
                  <button className="btn btn-success btn-lg" onClick={handleDonateClick}>
                    <i className="fa-solid fa-hand-holding-heart me-2"></i>
                    Donate Now !!
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - Campaign details */}
          <div className="col-12 col-lg-5">
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body p-4">
                <h2 className="fs-4 fw-bold mb-3 text-success">Campaign Details</h2>
                
                <div className="mb-3">
                  <p className="text-muted mb-1"><i className="fa-solid fa-user text-success me-2"></i>Created by</p>
                  <p className="fw-bold">
                    {currentCampaign?.owner || 'Anonymous'}
                  </p>
                </div>
                
                <div className="mb-3">
                  <p className="text-muted mb-1"><i className="fa-solid fa-calendar text-success me-2"></i>Start date</p>
                  <p className="fw-bold">{formatDate(currentCampaign.start_time)}</p>
                </div>
                
                {currentCampaign.end_date && (
                  <div className="mb-3">
                    <p className="text-muted mb-1"><i className="fa-solid fa-hourglass-end text-success me-2"></i>End date</p>
                    <p className="fw-bold">{formatDate(currentCampaign.end_date)}</p>
                  </div>
                )}
                
                {currentCampaign.location && (
                  <div className="mb-3">
                    <p className="text-muted mb-1"><i className="fa-solid fa-location-dot text-success me-2"></i>Location</p>
                    <p className="fw-bold">{currentCampaign.location}</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="card border-0 shadow-sm border-top border-success border-2">
              <div className="card-body p-4">
                <h2 className="fs-4 fw-bold mb-3 text-success">About this campaign</h2>
                <p className="card-text">{currentCampaign.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* No campaign found message */}
      {!loading && !currentCampaign && !error && (
        <div className="alert alert-info">
          Campaign not found. The campaign may have been removed or the ID is invalid.
        </div>
      )}

      {/* Donation Form Modal */}
      {showDonationForm && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Donate to {currentCampaign.title}</h5>
                <button type="button" className="btn-close" onClick={handleFormClose}></button>
              </div>
              <div className="modal-body">
                <p className="mb-3">You are donating to: <strong>{currentCampaign.title}</strong></p>
                <div className="mb-3">
                  <label htmlFor="donationAmount" className="form-label">Donation Amount ($)</label>
                  <input
                    type="number"
                    className="form-control"
                    id="donationAmount"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    min="1"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleFormClose}>Close</button>
                <button type="button" className="btn btn-success" onClick={handleDonationSubmit} disabled={!donationAmount}>
                  Donate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
