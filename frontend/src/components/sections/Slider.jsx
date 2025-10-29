import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampaigns } from "../../store/slices/campaignsSlice";
import CampaignSliderCard from "../cards/CampaignSliderCard";
import "../../style/Slider.css"; // Add a custom CSS file for styling

export default function Slider() {
  const dispatch = useDispatch();
  const { campaigns, loading, error } = useSelector((state) => state.campaigns);

  useEffect(() => {
    dispatch(fetchCampaigns());
  }, [dispatch]);

  if (loading) {
    return <p className="text-center my-5">Loading campaigns...</p>;
  }

  if (error) {
    return <p className="text-center text-danger my-5">Error: {error}</p>;
  }

  return (
    <div id="slider-section" className="slider-container py-5">
      <div className="container">
        <div className="card-carousel border-0 shadow-none">
          <div id="cardSlider" className="carousel slide" data-bs-ride="carousel">
            {/* Carousel Controls */}
            <div className="carousel-controls d-flex justify-content-between align-items-center border-0 gap-3 my-3">
              <h4 className="gidole-regular text-dark ">
                Discover fundraisers inspired by what you care about
              </h4>
              <div className="d-flex gap-2">
                <button
                  className="custom-carousel-btn"
                  type="button"
                  data-bs-target="#cardSlider"
                  data-bs-slide="prev"
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button
                  className="custom-carousel-btn"
                  type="button"
                  data-bs-target="#cardSlider"
                  data-bs-slide="next"
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>

            {/* Carousel Indicators */}
            <div className="carousel-indicators">
              {campaigns.map((_, index) => (
                <button
                  type="button"
                  data-bs-target="#cardSlider"
                  data-bs-slide-to={index}
                  className={index === 0 ? "active" : ""}
                  aria-current={index === 0 ? "true" : undefined}
                  aria-label={`Slide ${index + 1}`}
                  key={index}
                ></button>
              ))}
            </div>

            {/* Carousel Items */}
            <div className="carousel-inner">
              {campaigns.map((campaign, index) => (
                <div
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                  key={campaign.id}
                >
                  <div className="carousel-card">
                    <div className="row justify-content-center">
                      <CampaignSliderCard
                        title={campaign.title}
                        text={campaign.description}
                        imgSrc={
                          campaign.images?.[0]?.image || "/default_image.jpg"
                        }
                        totalAmount={campaign.goal_amount}
                        currentAmount={campaign.raised_amount}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}