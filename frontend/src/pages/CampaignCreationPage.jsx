import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createCampaign, fetchCampaigns } from '../store/slices/campaignsSlice';
import { fetchCategories } from '../store/slices/categoriesSlice';

export default function CampaignCreationPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.campaigns);
  const { isAuthenticated } = useSelector(state => state.auth);
  useEffect(()=>{
    dispatch(fetchCategories())
  },[])
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',  // Changed from category to category
    goal_amount: '',
    end_date: '',
    images: []
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      images: files
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = 'Title is required';
    if (!formData.description.trim()) errors.description = 'Description is required';
    if (!formData.category) errors.category = 'Category is required';  // Changed from category to category
    if (!formData.goal_amount || formData.goal_amount <= 0) errors.goal_amount = 'Valid goal amount is required';
    if (!formData.end_date) errors.end_date = 'End date is required';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const campaignData = new FormData();
    
    Object.keys(formData).forEach(key => {
      if (key === 'images') {
        formData.images.forEach(image => {
          campaignData.append('images', image);
        });
      } else if (key === 'category') {
        // Map category to category_id (backend expects 'category_id')
        campaignData.append('category_id', formData.category);
      } else {
        campaignData.append(key, formData[key]);
      }
    });

    try {
      await dispatch(createCampaign(campaignData)).unwrap();
      await dispatch(fetchCampaigns());
      navigate('/campaigns');
    } catch (err) {
      setFormErrors({ submit: err.message || 'Failed to create campaign' });
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="card border-0 shadow-sm border-top border-success border-2">
            <div className="card-body p-4">
              <h2 className="text-center perfect-font mb-4">Create Your Campaign</h2>
              
              {error && <div className="alert alert-danger">{error}</div>}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Campaign Title</label>
                  <input
                    type="text"
                    className={`form-control ${formErrors.title ? 'is-invalid' : ''}`}
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                  {formErrors.title && <div className="invalid-feedback">{formErrors.title}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <select
                    className={`form-select ${formErrors.category ? 'is-invalid' : ''}`}
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="">Select a category</option>
                    <option value="1">Medical</option>
                    <option value="2">Education</option>
                    <option value="3">Animals</option>
                    <option value="4">Business</option>
                    <option value="5">Emergency</option>
                  </select>
                  {formErrors.category && <div className="invalid-feedback">{formErrors.category}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Goal Amount ($)</label>
                  <input
                    type="number"
                    className={`form-control ${formErrors.goal_amount ? 'is-invalid' : ''}`}
                    name="goal_amount"
                    value={formData.goal_amount}
                    onChange={handleChange}
                    min="1"
                  />
                  {formErrors.goal_amount && <div className="invalid-feedback">{formErrors.goal_amount}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">End Date</label>
                  <input
                    type="date"
                    className={`form-control ${formErrors.end_date ? 'is-invalid' : ''}`}
                    name="end_date"
                    value={formData.end_date}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                  />
                  {formErrors.end_date && <div className="invalid-feedback">{formErrors.end_date}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Campaign Description</label>
                  <textarea
                    className={`form-control ${formErrors.description ? 'is-invalid' : ''}`}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="6"
                  ></textarea>
                  {formErrors.description && <div className="invalid-feedback">{formErrors.description}</div>}
                </div>

                <div className="mb-4">
                  <label className="form-label">Campaign Images</label>
                  <input
                    type="file"
                    className="form-control"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <small className="text-muted">You can select multiple images</small>
                </div>

                <div className="d-grid">
                  <button 
                    type="submit" 
                    className="btn btn-success btn-lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Creating Campaign...
                      </>
                    ) : (
                      'Create Campaign'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
