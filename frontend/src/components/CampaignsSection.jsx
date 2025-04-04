import Card4 from "./Card4";
export default function CampaignsSection({name}) {
  return (
    <>
      <h1 className="fs-3 fw-bold gidole-regular">{name}</h1>
      <div className="d-flex justify-content-between align-items-center gap-1 mt-5">
        <Card4
          image="/cancer_card.jpg"
          title="Medical Campaign 1"
          amount="$1000"
          link="#"
        />
        <Card4
          image="/cancer_card.jpg"
          title="Medical Campaign 2"
          amount="$2000"
          link="#"
        />
        <Card4
          image="/cancer_card.jpg"
          title="Medical Campaign 3"
          amount="$3000"
          link="#"
        />
      </div>
    </>
  );
}
