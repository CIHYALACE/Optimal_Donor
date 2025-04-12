import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLatestCampaigns } from "../store/slices/latestCampaignsSlice";
import Card1 from "./Card1";
import Card2 from "./Card2";

export default function LatestCampaigns() {
    const dispatch = useDispatch();
    const { latestCampaigns, loading, error } = useSelector((state) => state.latestCampaigns);

    useEffect(() => {
        dispatch(fetchLatestCampaigns());
    }, [dispatch]);

    if (loading) {
        return <p>Loading latest campaigns...</p>;
    }

    if (error) {
        const errorMessage = typeof error === "string" ? error : error.detail || "An error occurred";
        return <p>Error: {errorMessage}</p>;
    }

    return (
        <>
            <div className="container mb-5 mt-5 mt-md-0">
                <div className="row">
                    <h2 className="text-start">Latest Campaigns</h2>
                    <p className="text-start">Find your cause and start a campaign</p>
                </div>
                <div className="row d-flex justify-content-center align-items-center gap-0 flex-wrap">
                    {latestCampaigns.map((campaign, index) => {
                        const imgSrc = campaign.images.length > 0
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
                    })}
                </div>
            </div>
        </>
    );
}