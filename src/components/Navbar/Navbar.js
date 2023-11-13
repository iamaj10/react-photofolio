import React from "react";
import { Navbar, Container } from "react-bootstrap";

const NavBar = ({ setPageTitle }) => {
  const handleChanges = (e) => {
    e.preventDefault();
    setPageTitle("Albums");
  };
  return (
    <Navbar
      style={{ width: "100%", backgroundColor: "#0b6ba7", height: "100px" }}
    >
      <Container fluid>
        <div onClick={handleChanges} style={{ cursor: "pointer" }}>
          <svg
            style={{ marginLeft: "10px" }}
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            fill="currentColor"
            class="bi bi-journal-album"
            viewBox="0 0 16 16"
          >
            <path d="M5.5 4a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5v-5a.5.5 0 0 0-.5-.5h-5zm1 7a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3z" />
            <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
            <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
          </svg>
          <Navbar.Brand style={{ marginLeft: "10px" }}>
            Photo Folio
          </Navbar.Brand>
        </div>
      </Container>
    </Navbar>
  );
};

export default NavBar;
