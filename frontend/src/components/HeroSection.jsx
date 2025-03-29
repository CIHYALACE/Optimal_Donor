export default function HeroSection() {
  return (
    <>
      <div className="hero vh-100 mt-4 mt-lg-5">
        <div className="hero-content text-center d-flex flex-column flex-lg-row justify-content-center align-items-start">
          <div className="max-w-md d-none d-lg-flex flex-column justify-center align-items-end gap-5 gap-lg-0">
            <img
              src="../../public/coffe.jpeg"
              alt="Logo"
              className="w-50 rounded-circle"
            />
            <img
              src="../../public/coffe.jpeg"
              alt="Logo"
              className="w-50 rounded-circle align-self-lg-center"
            />
            <img
              src="../../public/coffe.jpeg"
              alt="Logo"
              className="w-50 rounded-circle"
            />
          </div>

          <div className="max-w-md d-flex flex-column justify-center align-items-center col-12 col-lg-6">
            <p className="py-6 fs-5">#1 crowdfunding platform</p>
            <h1 className="font-bold my-4 my-lg-3 px-3 px-lg-0 col-md-7">
              Alone we can do so little; together we can do so much.
            </h1>
            <button className="btn btn-success col-5 col-md-4 my-lg-5 ">
              Get Started
            </button>
          </div>

          <div className="d-flex justify-center align-items-center mt-5 mt-lg-0">
            <div className="d-flex flex-column justify-center align-items-center align-items-lg-start gap-5 gap-lg-0">
              <img
                src="../../public/coffe.jpeg"
                alt="Logo"
                className="col-8 col-md-6 rounded-circle"
                />
              <img
              src="../../public/coffe.jpeg"
              alt="Logo"
              className="col-8 col-md-6 rounded-circle align-self-lg-center"
              />
              <img
              src="../../public/coffe.jpeg"
              alt="Logo"
              className="col-8 col-md-6 rounded-circle"
              />
            </div>

            <div className="d-flex d-lg-none flex-column justify-center align-items-center gap-5">
              <img
              src="../../public/coffe.jpeg"
              alt="Logo"
              className="col-8 col-md-6 rounded-circle"
              />
              <img
              src="../../public/coffe.jpeg"
              alt="Logo"
              className="col-8 col-md-6 rounded-circle"
              />
              <img
              src="../../public/coffe.jpeg"
              alt="Logo"
              className="col-8 col-md-6 rounded-circle"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
