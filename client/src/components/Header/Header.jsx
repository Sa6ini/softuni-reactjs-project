import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { useNavbarHover } from "./useNavbarHover";

export default function Header() {
  useNavbarHover();

  return (
    <>
      <div className="container-fluid bg-dark px-0">
        <div className="row gx-0">
          <div className="col-lg-3 bg-dark d-none d-lg-block">
            <a
              href="index.html"
              className="navbar-brand w-100 h-100 m-0 p-0 d-flex align-items-center justify-content-center"
            >
              <h1 className="m-0 display-4 text-primary text-uppercase">Gymster</h1>
            </a>
          </div>
          <div className="col-lg-9">
            <div className="row gx-0 bg-secondary d-none d-lg-flex">
              <div className="col-lg-7 px-5 text-start">
                <div className="h-100 d-inline-flex align-items-center py-2 me-4">
                  <i className="fa fa-envelope text-primary me-2" />
                  <h6 className="mb-0">info@example.com</h6>
                </div>
                <div className="h-100 d-inline-flex align-items-center py-2">
                  <i className="fa fa-phone-alt text-primary me-2" />
                  <h6 className="mb-0">+012 345 6789</h6>
                </div>
              </div>
              <div className="col-lg-5 px-5 text-end">
                <div className="d-inline-flex align-items-center py-2">
                  <a
                    className="btn btn-light btn-square rounded-circle me-2"
                    href="#"
                  >
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a
                    className="btn btn-light btn-square rounded-circle me-2"
                    href="#"
                  >
                    <i className="fab fa-twitter" />
                  </a>
                  <a
                    className="btn btn-light btn-square rounded-circle me-2"
                    href="#"
                  >
                    <i className="fab fa-linkedin-in" />
                  </a>
                  <a
                    className="btn btn-light btn-square rounded-circle me-2"
                    href="#"
                  >
                    <i className="fab fa-instagram" />
                  </a>
                  <a className="btn btn-light btn-square rounded-circle" href="#">
                    <i className="fab fa-youtube" />
                  </a>
                </div>
              </div>
            </div>
            <Navbar bg="dark" variant="dark" expand="lg" className="p-3 p-lg-0 px-lg-5">
              <Container fluid>
                <Navbar.Brand href="index.html" className="d-block d-lg-none">
                  <h1 className="m-0 display-4 text-primary text-uppercase">
                    Gymster
                  </h1>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarCollapse" />
                <Navbar.Collapse id="navbarCollapse">
                  <Nav className="me-auto mb-2 mb-lg-0">
                    <Nav.Link href="index.html" className="nav-item nav-link active">
                      Home
                    </Nav.Link>
                    <Nav.Link href="about.html" className="nav-item nav-link">
                      About
                    </Nav.Link>
                    <Nav.Link href="class.html" className="nav-item nav-link">
                      Classes
                    </Nav.Link>
                    <Nav.Link href="team.html" className="nav-item nav-link">
                      Trainers
                    </Nav.Link>
                    <Nav.Link href="testimonials.html" className="nav-item nav-link">
                      Reviews
                    </Nav.Link>
                    <Nav.Link href="contact.html" className="nav-item nav-link">
                      Contact
                    </Nav.Link>
                  </Nav>
                  <a
                    href="#"
                    className="btn btn-primary py-md-3 px-md-5 d-none d-lg-block"
                  >
                    Join Us
                  </a>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </div>
        </div>
      </div>
    </>
  );
}
