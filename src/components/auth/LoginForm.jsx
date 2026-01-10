import { Form, Button, Alert, Card } from "react-bootstrap";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    try {
      login({
        email: e.target.email.value,
        password: e.target.password.value,
      });
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Card style={{ width: 400 }}>
      <Card.Body>
        <h3 className="mb-3 text-center">Login</h3>

        {/* Error alert */}
        {error && <Alert variant="danger">{error}</Alert>}

        {/* Login form */}
        <Form onSubmit={submit}>
          <Form.Control name="email" placeholder="Email" className="mb-3" />
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            className="mb-3"
          />
          <Button type="submit" className="w-100">
            Login
          </Button>
        </Form>

        {/* Footer link to Sign Up */}
        <div className="mt-3 text-center">
          Don't have an account?{" "}
          <Link
            to="/signup"
            style={{ textDecoration: "none", fontWeight: "500" }}
          >
            Sign Up
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
}
