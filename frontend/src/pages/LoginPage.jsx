import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginUser, clearError } from "../store/slices/authSlice";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

    // Clear any previous auth errors when component mounts
    return () => {
      dispatch(clearError());
    };
  }, [isAuthenticated, navigate, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear field-specific error when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      dispatch(
        loginUser({
          email: formData.email,
          password: formData.password,
        })
      );
    }
  };

  return (
    <>
      <section className="h-100 bg-light">
        <div className="container py-5 h-100 d-flex justify-content-center align-items-center">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card card-registration my-4 shadow-sm border-top border-success border-2">
                <div className="row g-0">

                  <div className="col-xl-12">
                    <div className="card-body p-md-5 text-black" style={{boxShadow: "0 4px 20px rgba(0,0,0,0.2)"}}>
                      <h3 className="mb-4 text-uppercase fw-bold text-success">
                        Sign In
                      </h3>

                      {error && (
                        <div className="alert alert-danger" role="alert">
                          {typeof error === "object"
                            ? Object.values(error).flat().join(", ")
                            : error}
                        </div>
                      )}

                      <form onSubmit={handleSubmit}>
                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="email">
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`form-control form-control-lg ${
                              formErrors.email ? "is-invalid" : ""
                            }`}
                          />
                          {formErrors.email && (
                            <div className="invalid-feedback">
                              {formErrors.email}
                            </div>
                          )}
                        </div>

                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="password">
                            Password
                          </label>
                          <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`form-control form-control-lg ${
                              formErrors.password ? "is-invalid" : ""
                            }`}
                          />
                          {formErrors.password && (
                            <div className="invalid-feedback">
                              {formErrors.password}
                            </div>
                          )}
                        </div>

                        <div className="mb-3 text-end">
                          <Link
                            to="/reset-password"
                            className="text-decoration-none"
                          >
                            Forgot password?
                          </Link>
                        </div>

                        <div className="d-flex justify-content-between align-items-center pt-3">
                          <button
                            type="submit"
                            className="btn btn-success"
                            disabled={loading}
                          >
                            {loading ? (
                              <>
                                <span
                                  className="spinner-border spinner-border-sm me-2"
                                  role="status"
                                  aria-hidden="true"
                                ></span>
                                Signing in...
                              </>
                            ) : (
                              "Sign In"
                            )}
                          </button>
                          <p className="small fw-bold mb-0">
                            Don't have an account?{" "}
                            <Link to="/register" className="text-success">
                              Register
                            </Link>
                          </p>
                        </div>
                      </form>
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
