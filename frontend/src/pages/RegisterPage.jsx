import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser, clearError } from '../store/slices/authSlice';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone_number: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(state => state.auth);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
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
      [name]: value
    });
    
    // Clear field-specific error when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    if (formData.phone_number && !/^01\d{9}$/.test(formData.phone_number)) {
      errors.phone_number = 'Phone number must be 11 digits and start with 01';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Remove confirmPassword as it's not needed in the API request
      const { confirmPassword, ...registrationData } = formData;
      
      const resultAction = await dispatch(registerUser(registrationData));
      
      if (!resultAction.error) {
        setRegistrationSuccess(true);
        // Reset form after successful registration
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          phone_number: ''
        });
        
        // Redirect to login page after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    }
  };

  return (
    <>
      <section className="h-100 bg-light">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card card-registration my-4 shadow-sm border-top border-success border-2">
                <div className="row g-0">
                  <div className="col-xl-6 d-none d-xl-block">
                    <img
                      src="https://images.unsplash.com/photo-1593113598332-cd59a93e6f62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
                      alt="Donation"
                      className="img-fluid h-100"
                      style={{
                        borderTopLeftRadius: '.25rem',
                        borderBottomLeftRadius: '.25rem',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                  <div className="col-xl-6">
                    <div className="card-body p-md-5 text-black">
                      <h3 className="mb-4 text-uppercase fw-bold text-success">
                        Create Account
                      </h3>
                      
                      {registrationSuccess && (
                        <div className="alert alert-success" role="alert">
                          Registration successful! Redirecting to login page...
                        </div>
                      )}
                      
                      {error && !registrationSuccess && (
                        <div className="alert alert-danger" role="alert">
                          {typeof error === 'object' 
                            ? Object.values(error).flat().join(', ') 
                            : error}
                        </div>
                      )}
                      
                      <form onSubmit={handleSubmit}>
                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="name">
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`form-control form-control-lg ${formErrors.name ? 'is-invalid' : ''}`}
                          />
                          {formErrors.name && (
                            <div className="invalid-feedback">{formErrors.name}</div>
                          )}
                        </div>

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
                            className={`form-control form-control-lg ${formErrors.email ? 'is-invalid' : ''}`}
                          />
                          {formErrors.email && (
                            <div className="invalid-feedback">{formErrors.email}</div>
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
                            className={`form-control form-control-lg ${formErrors.password ? 'is-invalid' : ''}`}
                          />
                          {formErrors.password && (
                            <div className="invalid-feedback">{formErrors.password}</div>
                          )}
                        </div>

                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="confirmPassword">
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`form-control form-control-lg ${formErrors.confirmPassword ? 'is-invalid' : ''}`}
                          />
                          {formErrors.confirmPassword && (
                            <div className="invalid-feedback">{formErrors.confirmPassword}</div>
                          )}
                        </div>

                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="phone_number">
                            Mobile Phone (Optional)
                          </label>
                          <input
                            type="text"
                            id="phone_number"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                            placeholder="01xxxxxxxxx"
                            className={`form-control form-control-lg ${formErrors.phone_number ? 'is-invalid' : ''}`}
                          />
                          {formErrors.phone_number && (
                            <div className="invalid-feedback">{formErrors.phone_number}</div>
                          )}
                        </div>

                        <div className="d-flex justify-content-between align-items-center pt-3">
                          <button
                            type="submit"
                            className="btn btn-success btn-lg"
                            disabled={loading || registrationSuccess}
                          >
                            {loading ? (
                              <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Registering...
                              </>
                            ) : 'Register'}
                          </button>
                          <p className="small fw-bold mt-2 pt-1 mb-0">
                            Already have an account? <Link to="/login" className="text-success">Sign In</Link>
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
