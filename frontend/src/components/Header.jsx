import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function Header() {
  let token = localStorage.getItem("accessToken");
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
          <span className='fw-bold fs-4 text-success '>Optimal Donor</span>
        </Navbar.Brand>
        <NavLink className={"nav-link"}><i className="fa-solid fa-search fs-5 d-sm-inline d-lg-none px-2"></i></NavLink>
        <NavLink className={"nav-link"} to={token ? "/profile" : "/login"}><i className="fa-solid fa-user fs-5 d-inline d-lg-none px-2 text-success"></i></NavLink>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto fw-bold">
            <Nav.Link className="nav-link" href="\" >Home</Nav.Link>
            <Nav.Link className="nav-link" href="/about">About</Nav.Link>
            <Nav.Link className={"nav-link"} href="/campaigns">Campaigns</Nav.Link>
            <Nav.Link className="nav-link" href="#contact-section">Contact</Nav.Link>
            <NavLink className={"nav-link"}><i className="fa-solid fa-search fs-5 d-none d-lg-inline px-2 text-success"></i></NavLink>
            <NavLink className={"nav-link"} to={token ? "/profile" : "/login"}><i className="fa-solid fa-user fs-5 d-none d-lg-inline px-2 text-success"></i></NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
