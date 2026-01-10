import { Container } from "react-bootstrap";

export default function AuthLayout({ children }) {
  return (
    <Container
      fluid
      className="vh-100 d-flex justify-content-center align-items-center"
      style={{
        background: "linear-gradient(135deg, #6c63ff, #00b4d8)",
        backgroundImage:
          "url('https://www.transparenttextures.com/patterns/cubes.png')",
      }}
    >
      {children}
    </Container>
  );
}
