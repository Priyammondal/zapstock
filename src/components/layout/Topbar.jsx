import { Navbar, Nav, Button, Container, Dropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { FaBars } from "react-icons/fa";

export default function Topbar() {
  const { logout } = useAuth();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="px-3 sticky-top">
      <Container fluid className="d-flex justify-content-between align-items-center">
        {/* Brand */}
        <Navbar.Brand className="fw-bold">Product Manager</Navbar.Brand>

        {/* Desktop Navigation */}
        <Nav className="d-none d-lg-flex me-auto ms-4">
          <Nav.Link
            as={NavLink}
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "fw-semibold text-warning" : ""
            }
          >
            Dashboard
          </Nav.Link>

          <Nav.Link
            as={NavLink}
            to="/products"
            className={({ isActive }) =>
              isActive ? "fw-semibold text-warning" : ""
            }
          >
            Products
          </Nav.Link>
        </Nav>

        {/* Right side - Mobile Hamburger & Desktop Logout */}
        <div className="d-flex align-items-center">
          {/* Desktop Logout */}
          <Button
            variant="outline-light"
            onClick={logout}
            className="d-none d-lg-block"
          >
            Logout
          </Button>

          {/* Mobile Hamburger Dropdown */}
          <div className="d-lg-none ms-3">
            <Dropdown align="end">
              <Dropdown.Toggle
                as="div"
                className="bg-dark p-2 d-flex align-items-center justify-content-center rounded"
                style={{ cursor: "pointer" }}
              >
                <FaBars size={20} color="white" />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as={NavLink} to="/dashboard">
                  Dashboard
                </Dropdown.Item>
                <Dropdown.Item as={NavLink} to="/products">
                  Products
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </Container>
    </Navbar>
  );
}
