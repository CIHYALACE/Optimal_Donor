import { NavLink, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function Header() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/campaigns?search=${searchQuery}`);
        }
    };
  return (
    <Navbar expand="lg" className="bg-body-tertiary position-sticky top-0 z-1">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Brand href="\" className="font-weight-bold fs-md-3 fw-bold big-shoulders d-flex align-items-center flex-row gap-2">
          <img
            alt=""
            src="/donate.png"
            width="45"
            height="45"
            className="d-inline-block align-top"
          />{" "}
          <span className="fw-bold fs-4 text-success">Optimal Donor</span>
        </Navbar.Brand>
        <NavLink className={"nav-link"} to={isAuthenticated ? "/profile" : "/login"}>
          <i className="fa-solid fa-user fs-5 d-inline d-lg-none px-2 text-success"></i>
        </NavLink>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto fw-bold">
            <Nav.Link className="nav-link" href="\">Home</Nav.Link>
            <Nav.Link className="nav-link" href="/about">About</Nav.Link>
            <Nav.Link className={"nav-link"} href="/campaigns">Campaigns</Nav.Link>
            <Nav.Link className="nav-link" href="#contact-section">Contact</Nav.Link>
            <form className="d-flex ms-auto" onSubmit={handleSearch}>
                    <input
                        type="text"
                        className="form-control me-2"
                        placeholder="Search campaigns..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="btn btn-success" type="submit">
                        <i className="fa-solid fa-search"></i>
                    </button>
                </form>
            <NavLink className={"nav-link"} to={isAuthenticated ? "/profile" : "/login"}>
              <i className="fa-solid fa-user fs-5 d-none d-lg-inline px-2 text-success"></i>
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
