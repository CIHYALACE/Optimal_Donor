import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, deleteUserAccount } from "../store/slices/usersSlice";
import axios from "axios";
import { ENDPOINTS } from "../api/constants";
import { Card, Button, Container, Modal, Form } from "react-bootstrap";
import { FaLocationDot } from "react-icons/fa6";

export default function UserProfile() {
  const dispatch = useDispatch();
  const { userProfile, loading, error } = useSelector((state) => state.users);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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

  const LogOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/";
  };

  const handleEditProfile = () => {
    setShowEditModal(true);
    setFormData({
      name: userProfile?.user?.name || "",
      bio: userProfile?.bio || "",
      location: userProfile?.location || "",
      date_of_birth: userProfile?.date_of_birth || ""
    });
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
  
      console.log("Endpoint:", `${ENDPOINTS.PROFILES}/${userProfile.id}/`);
      console.log("Form Data:", formDataToSend);
  
      await axios.put(
        `${ENDPOINTS.PROFILES}/${userProfile.id}/`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "multipart/form-data", // Set content type for file upload
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
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Container
      className="d-flex justify-content-center align-items-center py-5 my-2"
      style={{
        background: "linear-gradient(135deg,rgb(25, 135, 84),rgb(20, 43, 77))",
      }}
    >
      <Card
        className="p-4 rounded shadow-lg text-center"
        style={{
          height: "90%",
          width: "580px",
          borderRadius: "20px",
          boxShadow: "0px 10px 30px inset rgba(0, 0, 0, 0.2)",
        }}
      >
        <div className="position-relative">
          <Card.Img
            variant="top"
            src={ "https://i.imgur.com/Qtrsrk5.jpg"}
            className="rounded-top"
            style={{
              height: "140px",
              objectFit: "cover",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
            }}
          />
          <div
            className="position-absolute top-100 start-50 translate-middle border border-4 border-white rounded-circle"
            style={{
              width: "120px",
              height: "120px",
              overflow: "hidden",
              boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
            }}
          >
            <img
              src={userProfile?.picture || "https://i.imgur.com/Qtrsrk5.jpg"}
              alt="Profile"
              className="img-fluid rounded-circle"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "50%",
                boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
              }}
            />
          </div>
        </div>

        <Card.Body className="mt-5">
          <Button
            variant="success"
            className="mt-3 btn btn-warning fw-bold"
            onClick={handleEditProfile}
          >
            Edit Profile
          </Button>
          <Button
            onClick={() => LogOut()}
            variant="success"
            className="mt-3 mx-3 btn btn-danger fw-bold"
          >
            Logout
          </Button>
          <Button
            variant="danger"
            className="mt-3 btn btn-danger fw-bold"
            onClick={() => setShowDeleteConfirm(true)}
          >
            Delete Account
          </Button>
          <h3 className="fw-bold mt-3">{userProfile?.user?.name || "John Doe"}</h3>
          <p className="text-muted">
            <FaLocationDot className="me-2 text-success mb-1" />
            {userProfile?.location || "Unknown Location"}
          </p>

          <h4 className="fw-bold text-success mt-4">Bio</h4>
          <p className="text-center text-muted">
            {userProfile?.bio ||
              "Passionate about making a difference, I created this platform to connect people with causes that truly matter."}
          </p>
          <h4 className="fw-bold text-success mt-4">Date of Birth</h4>
          <p className="text-center text-muted">
            {userProfile?.date_of_birth || "01/01/2000"}
          </p>
          
        </Card.Body>
      </Card>

      {/* Edit Profile Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group className="mb-3">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, picture: e.target.files[0] })}
            />
          </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                value={formData.date_of_birth}
                onChange={(e) =>
                  setFormData({ ...formData, date_of_birth: e.target.value })
                }
              />
            </Form.Group>
            
           
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveProfile}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Account Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete your account? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
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