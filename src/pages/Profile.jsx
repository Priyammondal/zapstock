import {
  Card,
  Row,
  Col,
  Form,
  Button,
  Image,
  Alert,
  Container,
} from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { getCurrentUser, updateCurrentUser } from "@/utils/storage";
import Topbar from "../components/layout/Topbar";
import { FaCamera } from "react-icons/fa";
import DashboardLayout from "../components/layout/DashboardLayout";

const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB

export default function Profile() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");

  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(null);

  const fileInputRef = useRef(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setName(currentUser.name || "");
    }
  }, []);

  if (!user) {
    return <div className="text-center mt-5">No user found</div>;
  }

  const isProfileChanged = name !== user.name || avatarPreview !== null;

  /* ================= Avatar ================= */

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > MAX_IMAGE_SIZE) {
      alert("Image must be under 2MB");
      e.target.value = "";
      return;
    }

    const base64 = await toBase64(file);
    setAvatarPreview(base64); // ✅ preview only
    e.target.value = "";
  };

  /* ================= Save Profile ================= */

  const handleSaveProfile = () => {
    const updatedUser = {
      ...user,
      name,
      avatar: avatarPreview || user.avatar, // ✅ commit here
    };

    updateCurrentUser(updatedUser);
    setUser(updatedUser);
    setAvatarPreview(null);

    alert("Profile updated");
  };

  /* ================= Password ================= */

  const handlePasswordChange = () => {
    setPasswordError("");

    if (oldPassword !== user.password) {
      setPasswordError("Old password is incorrect");
      return;
    }

    if (!newPassword) {
      setPasswordError("New password cannot be empty");
      return;
    }

    const updatedUser = { ...user, password: newPassword };
    updateCurrentUser(updatedUser);
    setUser(updatedUser);

    setOldPassword("");
    setNewPassword("");
    setShowPasswordFields(false);

    alert("Password updated successfully");
  };

  return (
    <DashboardLayout showBackground>
      <Container className="justify-content-center my-4">
        <Col md={8} lg={6} className="mx-auto">
          <Card className="shadow-sm border-0">
            <Card.Body className="p-4">
              {/* ================= Avatar ================= */}
              <div className="text-center mb-4">
                <div className="text-center mb-4">
                  <div
                    className="position-relative d-inline-block avatar-wrapper"
                    onClick={handleAvatarClick}
                  >
                    <Image
                      roundedCircle
                      width={100}
                      height={100}
                      src={
                        avatarPreview ||
                        user.avatar ||
                        `https://ui-avatars.com/api/?name=${user.name}`
                      }
                      className="avatar-image"
                    />

                    {/* Hover Overlay (desktop only) */}
                    <div className="avatar-overlay d-none d-md-flex">
                      <FaCamera size={20} />
                    </div>
                  </div>

                  {/* Mobile-only text */}
                  <div className="text-muted mt-2 d-md-none">
                    Tap image to change
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleAvatarChange}
                  />
                </div>
              </div>

              {/* ================= Name ================= */}
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              {/* ================= Email ================= */}
              <Form.Group className="mb-4">
                <Form.Label>Email</Form.Label>
                <Form.Control value={user.email} disabled />
              </Form.Group>

              <div className="d-flex justify-content-between">
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowPasswordFields(!showPasswordFields)}
                >
                  Change Password
                </Button>

                <Button
                  onClick={handleSaveProfile}
                  disabled={!isProfileChanged}
                >
                  Save Profile
                </Button>
              </div>

              {/* ================= Password Section ================= */}
              {showPasswordFields && (
                <div className="mt-4">
                  <hr />

                  {passwordError && (
                    <Alert variant="danger">{passwordError}</Alert>
                  )}

                  <Form.Group className="mb-3">
                    <Form.Label>Old Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </Form.Group>

                  <Button onClick={handlePasswordChange}>
                    Update Password
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Container>
    </DashboardLayout>
  );
}

/* ================= Helper ================= */

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
