import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUserData } from "../../redux/login/actions/login";

const DropDownButton = () => {
  const user = useSelector((state) => state.login.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Welcome, {user.user.roleId === 1 ? "Admin" : "User"}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() => {
            localStorage.clear();
            navigate("/", { replace: true });
            dispatch(removeUserData());
          }}
        >
          Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropDownButton;
