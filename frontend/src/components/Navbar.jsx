import { Link } from 'react-router-dom';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { Moon, Sun, Cart, Cloud } from 'react-bootstrap-icons';

export default function NavbarComponent({ toggleTheme, theme }) {
  return (
    <Navbar bg={theme === 'dark' ? 'dark' : 'light'} variant={theme} expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">Order Management</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="d-flex align-items-center gap-1">
              <Cart /> Orders
            </Nav.Link>
            <Nav.Link as={Link} to="/recommendations" className="d-flex align-items-center gap-1">
              <Cloud /> Recommendations
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}