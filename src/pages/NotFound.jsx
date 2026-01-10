import { Container, Row, Col, Button } from "react-bootstrap";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";

export default function NotFound() {
  const { user } = useAuth();

  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center">
      <Row className="text-center">
        <Col>
          <h1 className="display-1 fw-bold">404</h1>
          <p className="lead mb-4">
            Oops! The page you're looking for does not exist.
          </p>

          {user ? (
            <Link to="/dashboard">
              <Button variant="primary" size="lg">
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button variant="primary" size="lg">
                Login
              </Button>
            </Link>
          )}
        </Col>
      </Row>
    </Container>
  );
}
