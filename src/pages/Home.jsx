import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import dashboardImg from "@/assets/illustrations/dashboard.svg";

export default function Home() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #6c63ff 0%, #00b4d8 100%)",
        color: "#fff",
      }}
      className="d-flex align-items-center"
    >
      <Container>
        <Row className="align-items-center flex-column flex-md-row text-center text-md-start">
          {/* Left Hero */}
          <Col md={6} className="mb-4 mb-md-0">
            <h1 className="fw-bold display-5">Product Dashboard</h1>
            <p className="lead mb-4">
              Manage products, sales, and insights—all in one place.
            </p>

            <div className="d-flex justify-content-center justify-content-md-start gap-3 flex-wrap">
              <Link to="/login">
                <Button
                  className="shadow"
                  size="lg"
                  style={{ minWidth: "120px" }}
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  variant="outline-light"
                  size="lg"
                  className="shadow"
                  style={{ minWidth: "120px" }}
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          </Col>

          {/* Right Illustration */}
          <Col md={6}>
            <Image
              src={dashboardImg}
              alt="Dashboard Illustration"
              fluid
              style={{ maxHeight: "350px" }}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
