import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { activateAccount, clearAuthState } from "../store/slices/authSlice";

const Activate = () => {
  const { loading, success, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { uid, token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Clear any previous auth state
    dispatch(clearAuthState());

    // Log params for debugging
    console.log("Activation Parameters:", { uid, token });

    // Activate account if uid and token are provided
    if (uid && token) {
      console.log("Dispatching activation with:", { uid, token });
      dispatch(activateAccount({ uid, token }));
    }
  }, [uid, token, dispatch]);

  // Log auth state changes
  useEffect(() => {
    console.log("Auth state:", { loading, success, error });
  }, [loading, success, error]);

  useEffect(() => {
    // Redirect to login page after successful activation
    if (success) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body text-center">
              <h2 className="card-title mb-4">Account Activation</h2>

              {loading ? (
                <div className="d-flex justify-content-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : success ? (
                <div className="alert alert-success" role="alert">
                  <h4 className="alert-heading">Activation Successful!</h4>
                  <p>Your account has been successfully activated.</p>
                  <hr />
                  <p className="mb-0">
                    You will be redirected to the login page shortly. If not
                    redirected, <Link to="/login">click here</Link>.
                  </p>
                </div>
              ) : (
                <div className="alert alert-danger" role="alert">
                  <h4 className="alert-heading">Activation Failed</h4>
                  <p>
                    {error && typeof error === "object"
                      ? JSON.stringify(error)
                      : error || "Invalid activation link"}
                  </p>
                  <hr />
                  <p className="mb-0">
                    Please try again or{" "}
                    <Link to="/register">register again</Link>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activate;
