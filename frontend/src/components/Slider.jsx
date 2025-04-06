import Card5 from "./Card5";
import Card6 from "./Card6";

export default function Slider() {
  return (
    <>
      <div className="container my-5">
        <div className="card-carousel border-0 shadow-none">
          <div
            id="cardSlider"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-controls d-flex justify-content-between align-items-center border-0 gap-3 my-3 bg-white">
              <h4 className="gidole-regular">Discover fundraisers inspired by what you care about</h4>
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
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="carousel-card">
                  <div className="row">
                    <Card5
                      title="Campiagns1"
                      text="This is a wider card with supporting text below as a natural lead-in to additional content."
                      imgSrc="/palistine_card.jpg"
                      totalAmount="1000"
                      currentAmount="500"
                    />
                    <Card6
                      title="Campiagns2"
                      text="This is a wider card with supporting text below as a natural lead-in to additional content."
                      imgSrc="/prison_card.jpg"
                      totalAmount="1000"
                      currentAmount="500"
                    />
                    <Card6
                      title="Campiagns2"
                      text="This is a wider card with supporting text below as a natural lead-in to additional content."
                      imgSrc="/prison_card.jpg"
                      totalAmount="1000"
                      currentAmount="500"
                    />
                    <Card6
                      title="Campiagns2"
                      text="This is a wider card with supporting text below as a natural lead-in to additional content."
                      imgSrc="/prison_card.jpg"
                      totalAmount="1000"
                      currentAmount="500"
                    />
                  </div>
                </div>
              </div>

              <div className="carousel-item">
                <div className="carousel-card">
                  <div className="row">
                    <Card5
                      title="Campiagns1"
                      text="This is a wider card with supporting text below as a natural lead-in to additional content."
                      imgSrc="/palistine_card.jpg"
                      totalAmount="1000"
                      currentAmount="500"
                    />
                    <Card6
                      title="Campiagns2"
                      text="This is a wider card with supporting text below as a natural lead-in to additional content."
                      imgSrc="/prison_card.jpg"
                      totalAmount="1000"
                      currentAmount="500"
                    />
                    <Card6
                      title="Campiagns2"
                      text="This is a wider card with supporting text below as a natural lead-in to additional content."
                      imgSrc="/prison_card.jpg"
                      totalAmount="1000"
                      currentAmount="500"
                    />
                    <Card6
                      title="Campiagns2"
                      text="This is a wider card with supporting text below as a natural lead-in to additional content."
                      imgSrc="/prison_card.jpg"
                      totalAmount="1000"
                      currentAmount="500"
                    />
                  </div>
                </div>
              </div>

              <div className="carousel-item">
                <div className="carousel-card">
                  <div className="row">
                    <Card5
                      title="Campiagns1"
                      text="This is a wider card with supporting text below as a natural lead-in to additional content."
                      imgSrc="/palistine_card.jpg"
                      totalAmount="1000"
                      currentAmount="500"
                    />
                    <Card6
                      title="Campiagns2"
                      text="This is a wider card with supporting text below as a natural lead-in to additional content."
                      imgSrc="/prison_card.jpg"
                      totalAmount="1000"
                      currentAmount="500"
                    />
                    <Card6
                      title="Campiagns2"
                      text="This is a wider card with supporting text below as a natural lead-in to additional content."
                      imgSrc="/prison_card.jpg"
                      totalAmount="1000"
                      currentAmount="500"
                    />
                    <Card6
                      title="Campiagns2"
                      text="This is a wider card with supporting text below as a natural lead-in to additional content."
                      imgSrc="/prison_card.jpg"
                      totalAmount="1000"
                      currentAmount="500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
