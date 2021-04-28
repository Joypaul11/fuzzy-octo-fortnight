import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import './Navbar.css';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function AppNavbar() {
    const { logout } = useAuth();
    const history = useHistory();
    const location = useLocation();
    

    async function handleLogout() {
        // setError("")
        try {
          await logout()
          history.push("/login")
        } catch {
        //   setError("Failed to log out")
        }
    }
    return (
        <div className="app-navbar">
        <Navbar bg="light" expand="lg">
            {/* <Navbar.Brand><Link to="/">O-View</Link></Navbar.Brand> */}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto" activeKey={location.pathname}>
                <Nav.Link as={Link} to="/" >Profile</Nav.Link>
                <Nav.Link as={Link} to="/orders">Orders</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
        </Navbar>
        </div>
    )
}
