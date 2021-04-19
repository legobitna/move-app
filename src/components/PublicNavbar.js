import React from "react";
import { Navbar, Nav, Button, Form, FormControl } from "react-bootstrap";

const PublicNavbar = ({ setKeyword, setSearchBy }) => {
  let value = "";
  const handleSearch = (event) => {
    event.preventDefault();
    setKeyword(value);
  };
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">Bitna's Move App</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="#features" onClick={() => setSearchBy("topRated")}>
          Top rated
        </Nav.Link>
      </Nav>
      <Form inline onSubmit={(event) => handleSearch(event)}>
        <FormControl
          type="text"
          placeholder="Search"
          className="mr-sm-2"
          name="searchInput"
          onChange={(e) => (value = e.target.value)}
        />
        <Button variant="outline-danger" type="submit">
          Search
        </Button>
      </Form>
    </Navbar>
  );
};

export default PublicNavbar;
