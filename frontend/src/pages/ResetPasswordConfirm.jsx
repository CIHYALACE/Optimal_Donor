import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPasswordConfirm,
  clearAuthState,
} from "../store/slices/authSlice";

const ResetPasswordConfirm = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    new_password: "",
    re_new_password: "",
  });
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const { new_password, re_new_password } = formData;

  useEffect(() => {
    // Clear previous auth state when component mounts
    dispatch(clearAuthState());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (passwordMismatch) setPasswordMismatch(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (new_password !== re_new_password) {
      setPasswordMismatch(true);
      return;
    }

    dispatch(
      resetPasswordConfirm({
        uid,
        token,
        new_password,
        re_new_password,
      })
    );
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Set New Password</h2>

              {success ? (
                <div className="alert alert-success" role="alert">
                  <p>Password has been reset successfully!</p>
                  <p className="mb-0">Redirecting to login page...</p>
                </div>
              ) : (
                <>
                  {(error || passwordMismatch) && (
                    <div className="alert alert-danger" role="alert">
                      {passwordMismatch
                        ? "Passwords do not match"
                        : error?.token?.[0] ||
                          error?.new_password?.[0] ||
                          error?.non_field_errors?.[0] ||
                          "Failed to reset password"}
                    </div>
                  )}

                  <form onSubmit={onSubmit}>
                    <div className="mb-3">
                      <label htmlFor="new_password" className="form-label">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="new_password"
                        name="new_password"
                        value={new_password}
                        onChange={onChange}
                        minLength="8"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="re_new_password" className="form-label">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="re_new_password"
                        name="re_new_password"
                        value={re_new_password}
                        onChange={onChange}
                        minLength="8"
                        required
                      />
                    </div>

                    <div className="d-grid">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                      >
                        {loading ? "Processing..." : "Reset Password"}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordConfirm;
