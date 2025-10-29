import CampaignListCard from "../cards/CampaignListCard";

export default function CampaignsSection({ name, campaigns = [] }) {
  // Display a message if no campaigns are available for this category
  if (campaigns.length === 0) {
    return (
      <>
        <h1 className="fs-3 fw-bold gidole-regular mt-5">{name}</h1>
        <p className="text-muted">No campaigns available in this category.</p>
      </>
    );
  }

  // Only show up to 3 campaigns per section
  const displayCampaigns = campaigns.slice(0, 3);

  return (
    <>
      <h1 className="fs-3 fw-bold gidole-regular mt-5">{name}</h1>
      <div className="d-flex flex-wrap flex-md-nowrap justify-content-between align-items-center">
        {displayCampaigns.map(campaign => (
          <CampaignListCard
            key={campaign.id}
            image={campaign.images && campaign.images.length > 0 
              ? campaign.images[0].image 
              : "/cancer_card.jpg"}
            title={campaign.title}
            totalAmount={campaign.goal_amount}
            currentAmount={campaign.raised_amount}
            link={`/campaigns/${campaign.id}`}
          />
        ))}
      </div>
    </>
  );
}
