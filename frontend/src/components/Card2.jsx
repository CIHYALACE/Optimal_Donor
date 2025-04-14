export default function Card2({ title, text, imgSrc, action, onActionClick }) {
  return (
    <>
      <div
        className="card mb-4 col-12 bg-light border-0 shadow-sm"
        style={{ borderRadius: "10px", overflow: "hidden" }}
      >
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={imgSrc}
              className="img-fluid"
              alt={title}
              style={{
                width: "100%",
                height: "200px",
                padding:"5px",
                objectFit: "cover",
                borderTopLeftRadius: "10px",
                borderBottomLeftRadius: "10px",
              }}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body d-flex flex-column justify-content-between">
              <div>
                <h5 className="card-title text-success fw-bold">{title}</h5>
                <p className="card-text text-dark fw-bold">{text}</p>
              </div>
              <button
                className="btn btn-outline-success mt-3 fw-bold"
                onClick={onActionClick}
                style={{ alignSelf: "flex-start" }}
              >
                {action}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}