import { Container } from "react-bootstrap";
import Topbar from "./Topbar";

export default function DashboardLayout({ children, showBackground = false }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: showBackground
          ? "linear-gradient(135deg, #6c63ff, #00b4d8)"
          : "transparent",
        backgroundImage: showBackground
          ? "url('https://www.transparenttextures.com/patterns/cubes.png')"
          : "none",
      }}
    >
      <Topbar />
      <Container className="py-4 flex-grow-1">{children}</Container>
    </div>
  );
}
