import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { fetchCampaigns } from "../../store/slices/campaignsSlice";
import FeaturedCampaignCard from "../cards/FeaturedCampaignCard";

export default function TopicsSection() {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize useNavigate

    const { campaigns, loading } = useSelector((state) => state.campaigns);

    useEffect(() => {
        dispatch(fetchCampaigns());
    }, [dispatch]);

    const featuredCampaigns = campaigns.filter((campaign) => campaign.is_featured === true);

    const handleDonateNow = (campaignId) => {
        navigate(`/campaigns/${campaignId}`); // Navigate to the campaign details page
    };

    return (
        <>
            <div className="container mb-5 mt-5 mt-md-0">
                <div className="row">
                    <h2 className="text-start">Featured Topics</h2>
                    <p className="text-start">Find your cause and start a campaign</p>
                </div>
                <div className="row d-flex justify-content-center align-items-center gap-0 flex-wrap">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        featuredCampaigns.map((campaign, index) => {
                            const imgSrc = campaign.images && campaign.images.length > 0
                                ? campaign.images[0].image
                                : "/default_image.jpg";

                            return (
                                <FeaturedCampaignCard
                                    key={campaign.id}
                                    title={campaign.title}
                                    text={campaign.description}
                                    imgSrc={imgSrc}
                                    action="Donate Now"
                                    onActionClick={() => handleDonateNow(campaign.id)} // Pass the handler
                                />
                            );
                        })
                    )}
                </div>
            </div>
        </>
    );
}