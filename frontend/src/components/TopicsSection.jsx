import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCampaigns } from "../store/slices/campaignsSlice";
import Card1 from "./Card1";
import Card2 from "./Card2";

export default function TopicsSection() {
    const dispatch = useDispatch();

    // Access campaigns and loading state from Redux store
    const { campaigns, loading } = useSelector((state) => state.campaigns);

    // Fetch campaigns on component mount
    useEffect(() => {
        dispatch(fetchCampaigns());
    }, [dispatch]);

    // Filter campaigns by is_featured
    const featuredCampaigns = campaigns.filter((campaign) => campaign.is_featured === true);

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
                            // Extract the first image URL or use a default image
                            const imgSrc = campaign.images && campaign.images.length > 0
                                ? campaign.images[0].image
                                : "/default_image.jpg";

                            return index === 0 ? (
                                <Card1
                                    key={campaign.id}
                                    title={campaign.title}
                                    text={campaign.description}
                                    imgSrc={imgSrc}
                                    action="Donate Now"
                                />
                            ) : (
                                <Card2
                                    key={campaign.id}
                                    title={campaign.title}
                                    text={campaign.description}
                                    imgSrc={imgSrc}
                                    action="Donate Now"
                                />
                            );
                        })
                    )}
                </div>
            </div>
        </>
    );
}