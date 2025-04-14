import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, deleteUserAccount } from "../store/slices/usersSlice";
import axios from "axios";
import { ENDPOINTS } from "../api/constants";
import { Card, Button, Container, Modal, Form, Row, Col, Badge } from "react-bootstrap";
import {  FaEdit, FaSignOutAlt, FaTrash, FaUser, FaDollarSign, FaCalendarAlt, FaGift } from "react-icons/fa";
import { motion } from "framer-motion";
import { Navigate, useNavigate } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";

export default function UserProfile() {
  const dispatch = useDispatch();
  const { userProfile, loading, error } = useSelector((state) => state.users);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserIdAndProfile = async () => {
      try {
        const response = await axios.get(ENDPOINTS.AUTH.ME, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        const userId = response.data.id;
        dispatch(fetchUserProfile(userId));
      } catch (err) {
        console.error("Failed to fetch user ID:", err);
        window.location.href = "/login";
      }
    };

    fetchUserIdAndProfile();
  }, [dispatch]);

  const createCampaign = () => {
    navigate("/campaigns/create");
  };
  useEffect(() => {
    if (userProfile) {
      setFormData({
        name: userProfile?.user?.name || "",
        bio: userProfile?.bio || "",
        location: userProfile?.location || "",
        date_of_birth: userProfile?.date_of_birth || ""
      });
    }
  }, [userProfile]);

  const LogOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/";
  };

  const handleEditProfile = () => {
    setShowEditModal(true);
  };

  const handleSaveProfile = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("bio", formData.bio);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("date_of_birth", formData.date_of_birth);
      if (formData.picture) {
        formDataToSend.append("picture", formData.picture); 
      }
  
      await axios.put(
        `${ENDPOINTS.PROFILES}/${userProfile.id}/`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setShowEditModal(false);
      dispatch(fetchUserProfile(userProfile.id));
    } catch (err) {
      console.error("Failed to update profile:", err.response?.data || err.message);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await dispatch(deleteUserAccount(userProfile.id));
      localStorage.clear();
      window.location.href = "/";
    } catch (err) {
      console.error("Failed to delete account:", err);
    }
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="text-center">
          <div className="spinner-border text-success" role="status" style={{ width: "3rem", height: "3rem" }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading your profile...</p>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="text-center">
          <div className="alert alert-danger">
            <h4>Error Loading Profile</h4>
            <p>{error}</p>
            <Button variant="outline-danger" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container fluid className="p-0">
      {/* Hero Banner Section */}
      <div
        className="position-relative"
        style={{
          background: "linear-gradient(135deg, #1e7b4a, #0f3668)",
          height: "300px",
          overflow: "hidden"
        }}
      >
        <div
          className="position-absolute w-100 h-100"
          style={{
            backgroundImage: "url('https://i.imgur.com/Qtrsrk5.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.3
          }}
        />
        <Container className="h-100 d-flex flex-column justify-content-end">
          <div className="d-flex align-items-center mb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="position-relative"
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "5px solid white",
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)"
              }}
            >
              <img
                src={userProfile?.picture || "https://i.imgur.com/Qtrsrk5.jpg"}
                alt="Profile"
                className="w-100 h-100 object-fit-cover"
              />
              <div 
                className="position-absolute bottom-0 end-0 p-1 bg-success rounded-circle"
                style={{ cursor: "pointer" }}
                onClick={handleEditProfile}
              >
                <FaEdit color="white" size={16} />
              </div>
            </motion.div>
            <div className="ms-4 text-white">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="fw-bold mb-0"
              >
                {userProfile?.user?.name || "John Doe"}
              </motion.h1>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="d-flex align-items-center"
              >
                <FaLocationDot className="me-1"/>
                {userProfile?.location || "Unknown Location"}
              </motion.div>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mt-2 text-light"
              >
                {userProfile?.bio || "No bio provided"}
              </motion.p>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Content */}
      <Container className="py-5">
        <Row>
          {/* Left Column - User Info */}
          <Col lg={4}>
            <Card className="shadow-sm mb-4">
              <Card.Header className="bg-white border-bottom-0 pt-4">
                <h4 className="fw-bold text-center">Profile Information</h4>
              </Card.Header>
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <FaUser className="text-success me-3" size={18} />
                  <div>
                    <small className="text-muted">Full Name</small>
                    <p className="mb-0 fw-bold">{userProfile?.user?.name || "John Doe"}</p>
                  </div>
                </div>
                
                <div className="d-flex align-items-center mb-3">
                  
                  
                  <FaLocationDot className="me-3 text-success"/>
                  <div>
                    <small className="text-muted">Location</small>
                    <p className="mb-0">{userProfile?.location || "Not specified"}</p>

                  </div>
                  
                </div>
                
                <div className="d-flex align-items-center mb-3">
                  <FaCalendarAlt className="text-success me-3" size={18} />
                  <div>
                    <small className="text-muted">Member Since</small>
                    <p className="mb-0">{userProfile?.user?.date_joined ? new Date(userProfile?.user?.date_joined).toLocaleDateString() : "Unknown"}</p>
                  </div>
                </div>
                
                <div className="d-flex align-items-center mb-3">
                  <FaGift className="text-success me-3" size={18} />
                  <div>
                    <small className="text-muted">Date of Birth</small>
                    <p className="mb-0">{userProfile?.date_of_birth ? new Date(userProfile?.date_of_birth).toLocaleDateString() : "Not specified"}</p>
                  </div>
                </div>
                
                <div className="d-flex align-items-center">
                  <FaDollarSign className="text-success me-3" size={18} />
                  <div>
                    <small className="text-muted">Total Donations</small>
                    <p className="mb-0 fw-bold">${userProfile?.total_donations || 0}</p>
                  </div>
                </div>
              </Card.Body>
              <Card.Footer className="bg-white border-top-0 pb-4">
                <div className="d-grid gap-2">
                  <Button variant="outline-success" className="d-flex align-items-center justify-content-center" onClick={handleEditProfile}>
                    <FaEdit className="me-2" /> Edit Profile
                  </Button>
                  <Button variant="outline-danger" className="d-flex align-items-center justify-content-center" onClick={() => setShowDeleteConfirm(true)}>
                    <FaTrash className="me-2" /> Delete Account
                  </Button>
                  <Button variant="danger" className="d-flex align-items-center justify-content-center" onClick={LogOut}>
                    <FaSignOutAlt className="me-2" /> Logout
                  </Button>
                </div>
              </Card.Footer>
            </Card>
          </Col>

          {/* Right Column - Campaigns & Activity */}
          <Col lg={8}>
  <Card className="shadow-sm">
    <Card.Body style={{ minHeight: "400px" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="mb-0">Campaigns Created</h5>
        <Button variant="success" size="sm" onClick={createCampaign}>
          + New Campaign
        </Button>
      </div>

      {userProfile?.created_campaigns?.filter(campaign => campaign.is_published).length > 0 ? (
  <div className="row row-cols-1 row-cols-md-2 g-4">
    {userProfile.created_campaigns
      .filter(campaign => campaign.is_published)
      .map((campaign) => (
        <div key={campaign.id} className="col">
          <Card className="h-100">
            <div className="position-relative">
              <Card.Img 
                variant="top" 
                src={campaign.image || "https://i.imgur.com/Qtrsrk5.jpg"} 
                style={{ height: "140px", objectFit: "cover" }}
              />
              <Badge 
                bg={campaign.status === "active" ? "success" : "secondary"}
                className="position-absolute top-0 end-0 m-2"
              >
                {campaign.status || "Active"}
              </Badge>
            </div>

            <Card.Body>
              <Card.Title>{campaign.title}</Card.Title>
              <Card.Text className="text-muted small">
                {(campaign.description || "No description provided").substring(0, 80)}...
              </Card.Text>

              <div className="progress mb-2" style={{ height: "8px" }}>
                <div 
                  className="progress-bar bg-success" 
                  style={{ width: `${campaign.progress || 30}%` }}
                  role="progressbar"
                  aria-valuenow={campaign.progress || 30}
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>

              <div className="d-flex justify-content-between small text-muted">
                <span>${campaign.raised_amount || 0} raised</span>
                <span>Goal: ${campaign.goal_amount || 1000}</span>
              </div>
            </Card.Body>

            <Card.Footer className="bg-white border-top-0">
              <Button 
                variant="outline-success" 
                size="sm" 
                className="w-100"
                href={`/campaigns/${campaign.id}`}
              >
                View Campaign
              </Button>
            </Card.Footer>
          </Card>
        </div>
      ))}
  </div>
) : (
  <div className="text-center py-5">
    <img 
      src="https://i.imgur.com/Qtrsrk5.jpg" 
      alt="No Campaigns" 
      style={{ width: "120px", opacity: 0.5 }}
      className="rounded-circle mb-3"
    />
    <h5 className="text-muted">No campaigns created yet</h5>
    <p className="text-muted">Start making a difference by creating your first campaign</p>
    <Button variant="success">Create Campaign</Button>
  </div>
)}
    </Card.Body>
  </Card>
</Col>


        </Row>
      </Container>

      {/* Edit Profile Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg" centered>
        <Modal.Header closeButton className="border-bottom-0 pb-0">
          <Modal.Title className="text-success">Edit Your Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-0">
          <p className="text-muted mb-4">Update your information to help others know you better</p>
          <Form>
            <Row>
              <Col md={4} className="mb-4 d-flex flex-column align-items-center">
                <div 
                  className="position-relative mb-3"
                  style={{
                    width: "140px",
                    height: "140px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "5px solid #f8f9fa",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
                  }}
                >
                  <img
                    src={
                      formData.picture 
                        ? URL.createObjectURL(formData.picture) 
                        : userProfile?.picture || "https://i.imgur.com/Qtrsrk5.jpg"
                    }
                    alt="Profile Preview"
                    className="w-100 h-100 object-fit-cover"
                  />
                </div>
                <Form.Group>
                  <Form.Label className="btn btn-sm btn-outline-success">
                    <FaEdit className="me-2" /> Change Picture
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFormData({ ...formData, picture: e.target.files[0] })}
                      className="d-none"
                    />
                  </Form.Label>
                </Form.Group>
              </Col>
              
              <Col md={8}>
                <Row>
                  <Col md={12} className="mb-3">
                    <Form.Group>
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                      />
                    </Form.Group>
                  </Col>
                  
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>Location</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="City, Country"
                      />
                    </Form.Group>
                  </Col>
                  
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>Date of Birth</Form.Label>
                      <Form.Control
                        type="date"
                        value={formData.date_of_birth}
                        onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                      />
                    </Form.Group>
                  </Col>
                  
                  <Col md={12}>
                    <Form.Group>
                      <Form.Label>Bio</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        placeholder="Tell others about yourself..."
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer className="border-top-0">
          <Button variant="outline-secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSaveProfile}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal 
        show={showDeleteConfirm} 
        onHide={() => setShowDeleteConfirm(false)} 
        centered
        size="sm"
      >
        <Modal.Header closeButton className="border-bottom-0">
          <Modal.Title className="text-danger">Delete Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center mb-4">
            <div className="rounded-circle bg-danger bg-opacity-10 d-inline-flex p-4 mb-3">
              <FaTrash className="text-danger" size={32} />
            </div>
            <h5>Are you sure?</h5>
            <p className="text-muted">This will permanently delete your account and all associated data. This action cannot be undone.</p>
          </div>
        </Modal.Body>
        <Modal.Footer className="border-top-0 justify-content-center">
          <Button variant="outline-secondary" onClick={() => setShowDeleteConfirm(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteAccount}>
            Delete Account
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}