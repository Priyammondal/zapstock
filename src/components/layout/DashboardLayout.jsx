import { Container } from "react-bootstrap";
import Topbar from "./Topbar";

export default function DashboardLayout({ children }) {
  return (
    <>
      <Topbar />
      <Container className="py-4">{children}</Container>
    </>
  );
}
