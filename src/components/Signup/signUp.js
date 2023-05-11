import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./signUp.css";
import roleList from "../../redux/rolelist/actions/roleList";
import { signUpValidateForm } from "../../utils/formValidate";
import { signUpHandleBlur } from "../../utils/formValidate";
import { register } from "../../redux/signup/actions/signUp"
import {CaretDownFill} from "react-bootstrap-icons"


const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = useSelector((state) => state.roleList.roleList);
  const successOrErrorMessage = useSelector((state) => state.signUp);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    roleId: "",
  });
  const [formErrors, setFormErrors] = useState({
    firstNameError: "",
    lastNameError: "",
    passwordError: "",
    emailError: "",
    roleError: "",
  });
  const submit = (event) => {
    signUpValidateForm(event, formData, setFormErrors, dispatch, register);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleBlur = (event) => {
    signUpHandleBlur(event, formErrors, setFormErrors);
  };

  useEffect(() => {
    if (successOrErrorMessage.userRegister) {
      navigate("/", { replace: true });
    } else if (successOrErrorMessage.error) {
      setFormErrors((prevState) => ({
        ...prevState,
        emailError: "Repeated Email",
      }));
    }
    dispatch(roleList());
  }, [successOrErrorMessage]);
  return (
    <div className="container-fluid pt-5">
      <form className="signup-form card p-3 shadow bg-white">
        <h2 className="mx-auto">Sign Up</h2>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            className="form-control"
            placeholder="Enter your first name"
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <div className="error-message">{formErrors.firstNameError}</div>
        </div>
        <div className="form-group">
          <label >Last Name</label>
          <input
            type="text"
            id="last-name"
            name="lastName"
            className="form-control"
            placeholder="Enter your last name"
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <div className="error-message">{formErrors.lastNameError}</div>
        </div>
        <div className="form-group">
          <label >Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            placeholder="Enter your password"
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </div>
        <div className="error-message">{formErrors.passwordError}</div>
        <div className="form-group">
          <label >Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            placeholder="Enter your email address"
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <div className="error-message">{formErrors.emailError}</div>
        </div>
        <div className="form-group role">
          <label>Role</label>
          <CaretDownFill className="caret-down-fill-icon"/>
          <select
            className="form-control"
            onBlur={handleBlur}
            onChange={handleChange}
            name="roleId"
          >
            <option value="0">Select Role</option>
            {role.map((element) => {
              return (
                <option key={element.name} value={element.id.toString()}>
                  {element.name}
                </option>
              );
            })}
          </select>
          <div className="error-message">{formErrors.roleError}</div>
        </div>
        <button
          className="btn btn-primary"
          onClick={submit}
          disabled={successOrErrorMessage.loading ? true : false}
        >
          {successOrErrorMessage.loading ? "Loading..." : "Submit"}
        </button>
        <div className="mx-auto mt-2">
          Already have an account?{" "}
          <span
            className="navigate-signin text-primary"
            onClick={() => navigate("/", { replace: true })}
          >
            Login Here!
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
