export default function HeroSection() {
  return (
    <>
      <div className="hero vh-100">
        <div className="hero-content mt-5 text-center d-flex flex-column flex-lg-row justify-content-center align-items-start">
          {/* left side */}
          <div className="d-none d-lg-flex flex-column justify-center align-items-end gap-5 gap-lg-0">
            <div className="d-flex flex-column justify-center align-items-center align-items-lg-end">
            <a href="#" className="col-5 rounded-circle">
              <img
                src="/hero_your_cause.jpg"
                alt="Logo"
                className="col-6 col-lg-12 rounded-circle border border-4 border-success hero-images"
              />
            </a>
              <p className="me-4 badge bg-success">Your Cause</p>
            </div>

            <div className="d-flex flex-column justify-center align-items-center align-items-lg-center text-center">
            <a href="#" className="col-5 rounded-circle">
            <img
                src="hero_animal.jpg"
                alt="Logo"
                className="h-100 col-6 col-lg-12 rounded-circle border border-4 border-success hero-images"
              /></a>
              <p className="me-2 badge bg-success">Animals</p>
            </div>

            <div className="d-flex flex-column justify-center align-items-center align-items-lg-end text-end">
              <a href="#" className="col-5 rounded-circle">
                <img
                  src="/hero_business.jpg"
                  alt="Logo"
                  className="col-6 col-lg-12 rounded-circle border border-4 border-success hero-images"
                />
              </a>
              <p className="me-5 badge bg-success">Business</p>
            </div>

          </div>

          <div className=" d-flex flex-column justify-content-center align-items-center col-12 col-lg-6">
            <p className="pt-md-5 fs-1 fw-bold ">#1 crowdfunding platform</p>
            <h1 className="fw-bold fs-3 my-4 my-lg-3 px-3 px-lg-0 col-md-7 gidole-regular">
              Alone we can do so little; Together we can do so much.
            </h1>
            <a
              href="#slider-section"
              className="btn btn-success col-5 col-md-4 my-lg-5"
              onClick={(e) => {
                e.preventDefault(); // Prevent default anchor behavior
                document.getElementById("slider-section").scrollIntoView({ behavior: "smooth" });
              }}
            >
              Get Started
            </a>
          </div>

          {/* right side */}
          <div className="d-flex justify-center align-items-center mt-4 mt-lg-0">
            <div className="d-flex flex-column justify-content-center align-items-center align-items-lg-start gap-2 gap-lg-0">
              <div className="d-flex flex-column align-items-center align-items-lg-start">
                <a href="#" className="col-md-5 rounded-circle">
                <img
                  src="/hero_midical.jpg"
                  alt="Logo"
                  className="col-8 col-lg-12 rounded-circle border border-4 border-success hero-images"
                />
                </a>
                <p className="ms-md-5 badge bg-success">Medical</p>
              </div>

              <div className="d-flex flex-column justify-center align-items-center align-items-lg-center">
                <a href="#" className="col-md-5 rounded-circle">
                <img
                  src="/hero_emergency.jpg"
                  alt="Logo"
                  className="col-8 col-lg-12 rounded-circle border border-4 border-success hero-images"
                />
                </a>
                <p className="ms-md-2 badge bg-success">Emergency</p>
              </div>

              <div className="d-flex flex-column justify-center align-items-center align-items-lg-start">
                <a href="#" className="col-md-5 rounded-circle">
                <img
                  src="/hero_education.jpg"
                  alt="Logo"
                  className="col-8 col-lg-12 rounded-circle border border-4 border-success hero-images"
                />
                </a>
                <p className="ms-md-4 badge bg-success">Education</p>
              </div>
            </div>

            {/* mobile view */}
            <div className="d-flex d-lg-none flex-column justify-center align-items-center gap-2">
              <div className="d-flex flex-column align-items-center align-items-lg-start">
                <a href="#" className="rounded-circle">
                <img
                  src="/hero_your_cause.jpg"
                  alt="Logo"
                  className="col-8 col-md-6 rounded-circle border border-4 border-success hero-images"
                />
                </a>
                <p className="ms-md-5 badge bg-success">Your Cause</p>
              </div>

              <div className="d-flex flex-column justify-center align-items-center align-items-lg-start">
                <a href="#" className="rounded-circle">
                <img
                  src="/hero_animal.jpg"
                  alt="Logo"
                  className="col-8 col-md-6 rounded-circle border border-4 border-success"
                />
                </a>
                <p className="ms-md-5 badge bg-success">Animals</p>
              </div>

              <div className="d-flex flex-column justify-center align-items-center align-items-lg-start">
                <a href="#" className="rounded-circle">
                <img
                  src="/hero_business.jpg"
                  alt="Logo"
                  className="col-8 col-md-6 rounded-circle border border-4 border-success"
                />
                </a>
                <p className="ms-md-5 badge bg-success">Business</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
