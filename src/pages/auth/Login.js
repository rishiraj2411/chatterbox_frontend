import React,{useEffect,useState} from "react";
import "./auth.css";
import { BiLogIn } from "react-icons/bi";
import Card from "../../components/global/card/Card";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import PasswordInput from "../../components/global/passwordInput/PasswordInput";
import {
  login,
  RESET,
  sendLoginCode,
} from "../../redux/reducer/authSlice";
import { validateEmail } from "../../redux/service/authService";
import Loader from "../../components/loader/Loader";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialState);
  const { email, password } = formData;

  const { isLoggedIn, isLoading, isSuccess, isError, twoFactor } = useSelector(
    (state) => state.auth
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const loginUser = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("All fields are required", {
        position: toast.POSITION.TOP_LEFT,
      });
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const userData = { email, password};
    await dispatch(login(userData));
  };

  useEffect(() => {
    if (isLoggedIn && isSuccess) {
      navigate("/");
    }

    if (isError && twoFactor) {
      dispatch(sendLoginCode(email));
      navigate(`/loginWithCode/${email}`);
    }

    dispatch(RESET());
  }, [isSuccess, isLoggedIn, isError, twoFactor, email, navigate, dispatch]);

  return (
    <div className="container auth">
      {isLoading && <Loader />}
      <Card>
        <div className="form">
          <div className="--flex-center">
            <BiLogIn size={35} color="#999" />
          </div>
          <h2>Login</h2>

          <form onSubmit={loginUser}>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            <PasswordInput
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleInputChange}
            />

            <button type="submit" className="--btn --btn-primary --btn-block">
              Login
            </button>

          </form>
          <Link to="/forgotPassword">Forgot Password</Link>
          <span className="register">
            <Link to="/">Home</Link>
            <p> &nbsp; Don't have an account? &nbsp;</p>
            <Link to="/register">Register</Link>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Login;
