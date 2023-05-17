import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { signInValidateForm } from "../../utils/formValidate";
import { signInHandleBlur } from "../../utils/formValidate";
import {login} from "../../redux/login/actions/login"

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const successOrErrorMessage = useSelector((state) => state.login);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    emailError: "",
    passwordError: "",
  });
  const submit = (event) => {
    signInValidateForm(event, formData, setFormErrors, dispatch, login);
  };
  const handleBlur = (event) => {
    signInHandleBlur(event, formErrors, setFormErrors);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const { user, error } = successOrErrorMessage;
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/pollList");
    } else if (error) {
      const errorMessage = error.message;
      setFormErrors((prevState) => ({
        emailError:
          errorMessage === "user data not found"
            ? "user data not found"
            : prevState.emailError,
        passwordError:
          errorMessage === "password is incorrect"
            ? "password is incorrect"
            : prevState.passwordError,
      }));
    }
  }, [successOrErrorMessage]);

  return (
    <div className="container-fluid pt-5">
      <form className="signup-form card p-3 shadow bg-white">
        <h2 className="mx-auto">Login</h2>
        <div className="form-group">
          <label>Email Address</label>
          <input
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Enter your email address"
          />
          <div className="error-message">{formErrors.emailError}</div>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </div>
        <div className="error-message">{formErrors.passwordError}</div>
        <button
          className="btn btn-primary"
          onClick={submit}
          disabled={successOrErrorMessage.loading ? true : false}
        >
          {successOrErrorMessage.loading ? "Loading..." : "Submit"}
        </button>
        <div className="mx-auto mt-2">
          No Account?{" "}
          <span
            className="navigate-signup text-primary"
            onClick={() => navigate("./signup")}
          >
            SignUp
          </span>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
