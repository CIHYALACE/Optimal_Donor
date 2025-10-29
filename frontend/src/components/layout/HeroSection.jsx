export default function HeroSection() {
  return (
    <div className="min-vh-100 d-flex align-items-center bg-light">
      <div className="container py-5">
        <div className="row align-items-center mb-5">
          <div className="col-lg-6 text-center text-lg-start mb-4 mb-lg-0">
            <div className="badge bg-success bg-opacity-10 text-success px-3 py-2 mb-3 fw-semibold">
              #1 Crowdfunding Platform
            </div>
            <h1 className="display-4 fw-bold mb-4 text-dark">
              Alone we can do so little; Together we can do so much.
            </h1>
            <p className="lead text-muted mb-4">
              Join thousands of people making a difference. Start your campaign today and bring your cause to life.
            </p>
            <a
              href="#slider-section"
              className="btn btn-success btn-lg px-5 py-3 shadow-sm"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("slider-section")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Get Started
            </a>
          </div>

          <div className="col-lg-6">
            <div className="position-relative">
              <img
                src="/hero_midical.jpg"
                alt="Medical"
                className="img-fluid rounded-4 shadow-lg"
                style={{ maxHeight: '400px', width: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>

        {/* Category Cards */}
        <div className="row g-4 mt-4">
          <div className="col-12 text-center mb-3">
            <h3 className="fw-semibold text-dark">Choose Your Category</h3>
          </div>

          <div className="col-6 col-md-4 col-lg-2">
            <a href="#" className="text-decoration-none">
              <div className="card border-0 shadow-sm h-100 hover-lift">
                <div className="card-body text-center p-3">
                  <div className="rounded-circle overflow-hidden mb-3 mx-auto" style={{ width: '80px', height: '80px' }}>
                    <img
                      src="/hero_midical.jpg"
                      alt="Medical"
                      className="w-100 h-100 object-fit-cover"
                    />
                  </div>
                  <h6 className="mb-0 fw-semibold text-dark">Medical</h6>
                </div>
              </div>
            </a>
          </div>

          <div className="col-6 col-md-4 col-lg-2">
            <a href="#" className="text-decoration-none">
              <div className="card border-0 shadow-sm h-100 hover-lift">
                <div className="card-body text-center p-3">
                  <div className="rounded-circle overflow-hidden mb-3 mx-auto" style={{ width: '80px', height: '80px' }}>
                    <img
                      src="/hero_emergency.jpg"
                      alt="Emergency"
                      className="w-100 h-100 object-fit-cover"
                    />
                  </div>
                  <h6 className="mb-0 fw-semibold text-dark">Emergency</h6>
                </div>
              </div>
            </a>
          </div>

          <div className="col-6 col-md-4 col-lg-2">
            <a href="#" className="text-decoration-none">
              <div className="card border-0 shadow-sm h-100 hover-lift">
                <div className="card-body text-center p-3">
                  <div className="rounded-circle overflow-hidden mb-3 mx-auto" style={{ width: '80px', height: '80px' }}>
                    <img
                      src="/hero_education.jpg"
                      alt="Education"
                      className="w-100 h-100 object-fit-cover"
                    />
                  </div>
                  <h6 className="mb-0 fw-semibold text-dark">Education</h6>
                </div>
              </div>
            </a>
          </div>

          <div className="col-6 col-md-4 col-lg-2">
            <a href="#" className="text-decoration-none">
              <div className="card border-0 shadow-sm h-100 hover-lift">
                <div className="card-body text-center p-3">
                  <div className="rounded-circle overflow-hidden mb-3 mx-auto" style={{ width: '80px', height: '80px' }}>
                    <img
                      src="/hero_animal.jpg"
                      alt="Animals"
                      className="w-100 h-100 object-fit-cover"
                    />
                  </div>
                  <h6 className="mb-0 fw-semibold text-dark">Animals</h6>
                </div>
              </div>
            </a>
          </div>

          <div className="col-6 col-md-4 col-lg-2">
            <a href="#" className="text-decoration-none">
              <div className="card border-0 shadow-sm h-100 hover-lift">
                <div className="card-body text-center p-3">
                  <div className="rounded-circle overflow-hidden mb-3 mx-auto" style={{ width: '80px', height: '80px' }}>
                    <img
                      src="/hero_business.jpg"
                      alt="Business"
                      className="w-100 h-100 object-fit-cover"
                    />
                  </div>
                  <h6 className="mb-0 fw-semibold text-dark">Business</h6>
                </div>
              </div>
            </a>
          </div>

          <div className="col-6 col-md-4 col-lg-2">
            <a href="#" className="text-decoration-none">
              <div className="card border-0 shadow-sm h-100 hover-lift">
                <div className="card-body text-center p-3">
                  <div className="rounded-circle overflow-hidden mb-3 mx-auto" style={{ width: '80px', height: '80px' }}>
                    <img
                      src="/hero_your_cause.jpg"
                      alt="Your Cause"
                      className="w-100 h-100 object-fit-cover"
                    />
                  </div>
                  <h6 className="mb-0 fw-semibold text-dark">Your Cause</h6>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
        }
        .object-fit-cover {
          object-fit: cover;
        }
      `}</style>
    </div>
  );
}