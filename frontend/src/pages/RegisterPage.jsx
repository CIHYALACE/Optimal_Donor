export default function RegisterPage() {
  return (
    <>
      <section className="h-100 bg-dark">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card card-registration my-4">
                <div className="row g-0">
                  <div className="col-xl-6 d-none d-xl-block">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                      alt="Sample photo"
                      className="img-fluid"
                      style={{
                        borderTopLeftRadius: '.25rem',
                        borderBottomLeftRadius: '.25rem'
                      }}                    />
                  </div>
                  <div className="col-xl-6">
                    <div className="card-body p-md-5 text-black">
                      <h3 className="mb-5 text-uppercase">
                        User registration form
                      </h3>

                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div data-mdb-input-init className="form-outline">
                          <label className="form-label" for="form3Example1m">
                              First name
                            </label>
                            <input
                              type="text"
                              id="form3Example1m"
                              className="form-control form-control-lg"
                            />
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div data-mdb-input-init className="form-outline">
                          <label className="form-label" for="form3Example1n">
                              Last name
                            </label>
                            <input
                              type="text"
                              id="form3Example1n"
                              className="form-control form-control-lg"
                            />
                          </div>
                        </div>
                      </div>

                      <div data-mdb-input-init className="form-outline mb-4">
                      <label className="form-label" for="form3Example8">
                          Email
                        </label>
                        <input
                          type="email"
                          id="form3Example8"
                          className="form-control form-control-lg"
                        />
                      </div>

                      <div data-mdb-input-init className="form-outline mb-4">
                        <label className="form-label" for="form3Example90">
                          Password
                        </label>
                        <input
                          type="Password"
                          id="form3Example90"
                          className="form-control form-control-lg"
                        />
                      </div>

                      <div data-mdb-input-init className="form-outline mb-4">
                        <label className="form-label" for="form3Example90">
                          Confirm Password
                        </label>
                        <input
                          type="Password"
                          id="form3Example90"
                          className="form-control form-control-lg"
                        />
                      </div>

                      <div data-mdb-input-init className="form-outline mb-4">
                        <label className="form-label" for="form3Example99">
                          Mobile Phone
                        </label>
                        <input
                          type="text"
                          id="form3Example99"
                          className="form-control form-control-lg"
                        />
                      </div>

                      <div className="d-flex justify-content-start pt-3">
                        <button
                          type="button"
                          data-mdb-button-init
                          data-mdb-ripple-init
                          className="btn btn-success"
                        >
                          Register
                        </button>
                        <p className="small fw-bold mt-2 pt-1 mb-0 mx-3">Already have an account?<a href="/login">Login</a></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
