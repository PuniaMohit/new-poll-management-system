import { Container, Navbar } from "react-bootstrap";
import { removeUserData } from "../../redux/login/actions/login";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.login.userLogin);
  return (
    <Navbar className="navbar">
      <Container>
        <Navbar.Brand className="navbar-header">Poll Management</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end navbar-button">
          <div className="button-container">
            {userDetails && userDetails.user.roleId === 1 && (
              <button className="add-poll-button  ">Add Poll</button>
            )}
            <button
              onClick={() => {
                localStorage.clear();
                navigate("/", { replace: true });
                dispatch(removeUserData());
              }}
              variant="primary"
              className="logout-button  "
            >
              Logout
            </button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
