import { Navbar, Nav, Image, Dropdown, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { getCurrentUser, removeToken } from "@/utils/storage";
import { FaBars } from "react-icons/fa";

export default function Topbar() {
  const user = getCurrentUser();

  const logout = () => {
    removeToken();
    window.location.href = "/login";
  };

  return (
    <Navbar bg="white" expand="lg" className="topbar-clean">
      <Container fluid className="px-4">
        {/* Brand */}
        <Navbar.Brand className="d-flex align-items-center fw-bold text-dark gap-2 animate-logo">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1828/1828673.png"
            alt="ZapStock Logo"
            width={30}
            height={30}
            style={{ objectFit: "contain" }}
          />
          ZapStock
        </Navbar.Brand>

        {/* Desktop Navigation */}
        <Nav className="d-none d-lg-flex ms-auto gap-4">
          <Nav.Link as={NavLink} to="/dashboard" className="nav-clean-link">
            Dashboard
          </Nav.Link>

          <Nav.Link as={NavLink} to="/products" className="nav-clean-link">
            Products
          </Nav.Link>
        </Nav>

        {/* Right section */}
        <div className="d-flex align-items-center gap-3 ms-4">
          {/* Desktop Avatar */}
          <Dropdown align="end" className="d-none d-lg-block">
            <Dropdown.Toggle as="div" className="profile-trigger" caret={false}>
              <Image
                roundedCircle
                width={36}
                height={36}
                src={
                  user?.avatar ||
                  `https://ui-avatars.com/api/?name=${user?.name}`
                }
              />
            </Dropdown.Toggle>

            <Dropdown.Menu className="profile-dropdown">
              <Dropdown.Item as={NavLink} to="/profile">
                Profile
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* Mobile Menu */}
          <Dropdown align="end" className="d-lg-none">
            <Dropdown.Toggle as="div" className="mobile-trigger" caret={false}>
              <FaBars size={20} />
            </Dropdown.Toggle>

            <Dropdown.Menu className="profile-dropdown">
              <Dropdown.Item as={NavLink} to="/dashboard">
                Dashboard
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/products">
                Products
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/profile">
                Profile
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
    </Navbar>
  );
}
