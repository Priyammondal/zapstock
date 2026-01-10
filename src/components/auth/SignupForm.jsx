import { Card, Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";

export default function SignupForm() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    // Simple regex for email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const submit = (e) => {
    e.preventDefault();
    setError("");

    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    // Validation
    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      signup({ name, email, password });
      navigate("/dashboard"); // go to dashboard after successful signup
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Card style={{ width: 400, maxWidth: "100%" }}>
      <Card.Body>
        <h3 className="mb-3 text-center">Sign Up</h3>

        {/* Error alert */}
        {error && (
          <Alert variant="danger">
            {error}{" "}
            {error === "User already exists" && (
              <>
                — <Link to="/login">Go to Login</Link>
              </>
            )}
          </Alert>
        )}

        {/* Signup form */}
        <Form onSubmit={submit}>
          <Form.Control name="name" placeholder="Name" className="mb-3" />
          <Form.Control name="email" placeholder="Email" className="mb-3" />
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            className="mb-3"
          />

          <Button type="submit" className="w-100">
            Create Account
          </Button>
        </Form>

        {/* Footer link to Login */}
        <div className="mt-3 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            style={{ textDecoration: "none", fontWeight: "500" }}
          >
            Login
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
}
