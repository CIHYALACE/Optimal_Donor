import Card3 from "../components/Card3";
import CampaignsSection from "../components/CampaignsSection";

export default function CampaignsPage() {
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

  return (
    <div className="container mt-5 mb-5">
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
          <CampaignsSection name={`${category.name} Campaigns`} />
          <hr />
        </div>
      ))}
    </div>
  );
}