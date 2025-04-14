import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, clearAuthState } from "../store/slices/authSlice";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const { loading, success, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    // Clear previous auth state when component mounts
    return () => dispatch(clearAuthState());
  }, [dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword(email));
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Reset Password</h2>

              {success ? (
                <div className="alert alert-success" role="alert">
                  <p>Password reset link has been sent to your email!</p>
                  <p className="mb-0">
                    Please check your inbox and follow the instructions.
                  </p>
                </div>
              ) : (
                <>
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error.email?.[0] ||
                        "Something went wrong. Please try again."}
                    </div>
                  )}
                  <form onSubmit={onSubmit}>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email address
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <div className="form-text">
                        Enter the email address you registered with.
                      </div>
                    </div>
                    <div className="d-grid">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                      >
                        {loading ? "Sending..." : "Reset Password"}
                      </button>
                    </div>
                  </form>
                </>
              )}

              <div className="mt-3 text-center">
                <Link to="/login">Back to Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
