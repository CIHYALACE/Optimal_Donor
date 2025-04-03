export default function Card1({ title, text, imgSrc, action }) {

  return (
    <>
      <div className="card mb-3 col-12 bg-light border-0">
        <div className="row g-0">
          <div className="col-md-4">
            <img src={imgSrc} className="img-fluid rounded-start" alt="..." />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{text}</p>
              <a href="#" className="text-decoration-none link-effect">{action}&nbsp;<i className="fas fa-arrow-right"></i></a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
