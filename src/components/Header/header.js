import { Container, Navbar } from "react-bootstrap";
import DropDownButton from "../../utils/DropdownButton/dropDownButton";

const Header = () => {
  return (
    <Navbar className="navbar">
      <Container>
        <Navbar.Brand className="navbar-header">Poll Management</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end navbar-button">
          <div className="button-container">
            <DropDownButton />
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
