import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavbarHover } from "./useNavbarHover";

export default function Header() {
  useNavbarHover();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/user', {
          withCredentials: true
        });
        setIsLoggedIn(response.status === 200);
        setUserRole(response.data.user.role);
      } catch (err) {
        setIsLoggedIn(false);
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <>
      <div className="container-fluid bg-dark px-0">
        <div className="row gx-0">
          <div className="col-lg-3 bg-dark d-none d-lg-block">
            <Link
              to=""
              className="navbar-brand w-100 h-100 m-0 p-0 d-flex align-items-center justify-content-center"

            >
              <h1 className="m-0 display-4 text-primary text-uppercase">Gymster</h1>
            </Link>
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
                <Navbar.Brand as={Link} to="" className="d-block d-lg-none">
                  <h1 className="m-0 display-4 text-primary text-uppercase">
                    Gymster
                  </h1>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarCollapse" />
                <Navbar.Collapse id="navbarCollapse">
                  <Nav className="me-auto mb-2 mb-lg-0">
                    <Nav.Link as={Link} to="" className="nav-item nav-link">
                      Home
                    </Nav.Link>
                    <Nav.Link as={Link} to="/about" className="nav-item nav-link">
                      About
                    </Nav.Link>
                    <Nav.Link as={Link} to="/classes" className="nav-item nav-link">
                      Classes
                    </Nav.Link>
                    <Nav.Link as={Link} to="/trainers" className="nav-item nav-link">
                      Trainers
                    </Nav.Link>
                    <Nav.Link as={Link} to="/reviews" className="nav-item nav-link">
                      Reviews
                    </Nav.Link>
                    <Nav.Link as={Link} to="/contact" className="nav-item nav-link">
                      Contact
                    </Nav.Link>
                    {userRole === 'boss' && ( 
                      <Nav.Link as={Link} to="/users" className="nav-item nav-link">
                        Users
                      </Nav.Link>
                    )}
                  </Nav>
                  {isLoggedIn ? (
                    <Link
                      to="/profile"
                      className="btn btn-primary py-md-3 px-md-5 d-lg-block"
                    >
                      Profile
                    </Link>
                  ) : (
                    <Link
                      to="/login"
                      className="btn btn-primary py-md-3 px-md-5 d-lg-block"
                    >
                      Join Us
                    </Link>
                  )}

                </Navbar.Collapse>
              </Container>
            </Navbar>
          </div>
        </div>
      </div>
    </>
  );
}
