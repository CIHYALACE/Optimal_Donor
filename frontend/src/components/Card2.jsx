export default function Card2({ title, text, imgSrc, action }) {
  return (
    <>
      <div className="card col-12 col-md-3 bg-light border-0">
        <img src={imgSrc} className="card-img-top" alt="..." />
        <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{text}</p>
            <a href="#" className="text-decoration-none link-effect">{action}&nbsp;<i className="fas fa-arrow-right"></i></a>
        </div>
      </div>
    </>
  );
}
