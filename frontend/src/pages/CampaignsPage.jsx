import Card3 from "../components/Card3";
import CampaignsSection from "../components/CampaignsSection";

export default function CampaignsPage() {
  return (
    <div className="container mt-5 mb-5">
      <div className="col-12 col-md-7 mb-5">
        <h1 className="fs-bigger gidole-regular">
          Browse fundraisers by category
        </h1>
        <p className="fs-5 gidole-regular text-muted">
          People around the world are raising money for what they are passionate
          about.
        </p>
        <a className="btn btn-success fw-bold p-2 px-4">Donate Now</a>
      </div>

      <div className="d-flex justify-content-between align-items-center gap-1 mt-5">
        <Card3 name="Education" icon="fa-solid fa-graduation-cap" />
        <Card3 name="Animals" icon="fa-solid fa-shield-dog" />
        <Card3 name="Medical" icon="fa-solid fa-heart" />
        <Card3 name="Business" icon="fa-solid fa-building" />
        <Card3 name="Emergancy" icon="fa-solid fa-umbrella" />
      </div>
      <hr></hr>
      <div>
      <CampaignsSection name="Medical Campaigns"/>
      </div>
      <hr></hr>
      <div>
      <CampaignsSection name="Education Campaigns"/>
      </div>
      <hr></hr>
      <div>
      <CampaignsSection name="Animals Campaigns"/>
      </div>
      <hr></hr>
      <div>
      <CampaignsSection name="Business Campaigns"/>
      </div>
      <hr></hr>
      <div>
      <CampaignsSection name="Emergancy Campaigns"/>
      </div>
      

    </div>
  );
}
