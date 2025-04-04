import Card4 from "./Card4";
export default function CampaignsSection({name}) {
  return (
    <>
      <h1 className="fs-3 fw-bold gidole-regular  mt-5">{name}</h1>
      <div className="d-flex flex-wrap flex-md-nowrap justify-content-between align-items-center">
        <Card4
          image="/cancer_card.jpg"
          title="Medical Campaign 1"
          totalAmount="1000"
          currentAmount="496"
          link="#"
        />
        <Card4
          image="/cancer_card.jpg"
          title="Medical Campaign 2"
          totalAmount="2000"
          currentAmount="1400"
          link="#"
        />
        <Card4
          image="/cancer_card.jpg"
          title="Medical Campaign 3"
          totalAmount="3000"
          currentAmount="1322"
          link="#"
        />
      </div>
    </>
  );
}
