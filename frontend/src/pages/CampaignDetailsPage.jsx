import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampaignById, donateToCampaign } from '../store/slices/campaignsSlice';
import ProgressBar from '../components/ProgressBar';
import Swal from 'sweetalert2';

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
  }, [dispatch, id]);

  const handleDonateClick = () => {
    setShowDonationForm(true);
  };

  const handleFormClose = () => {
    setShowDonationForm(false);
    setDonationAmount('');
  };

  const handleDonationSubmit = async () => {
    try {
      if (!donationAmount || isNaN(donationAmount) || donationAmount <= 0) {
        alert("Please enter a valid donation amount.");
        return;
      }
  
      await dispatch(donateToCampaign({ campaignId: currentCampaign.id, amount: parseFloat(donationAmount) })).unwrap();
  
      dispatch(fetchCampaignById(currentCampaign.id));
  
      handleFormClose();
  
      Swal.fire({
        icon: 'success',
        title: 'Thank you!',
        text: 'Your donation has been successfully processed.',
      });
    } catch (error) {
      console.error("Error processing donation:", error);
      alert(error.message || "Failed to process donation. Please try again.");
    }
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
                src={currentCampaign.images?.[0]?.image || "/cancer_card.jpg"} 
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
                <p>{currentCampaign.description}</p>
              </div>
            </div>
          </div>
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