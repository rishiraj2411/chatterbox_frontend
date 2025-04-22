import React from "react";
import "./Header.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BiLogIn } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { logout, RESET } from "../../../redux/reducer/authSlice";
import { ShowOnLogin, ShowOnLogout } from "../../protect/HiddenLink";
import { FaUserCircle } from "react-icons/fa";
import { UserName } from "../../../pages/profile/Profile";

const activeLink = ({ isActive }) => (isActive ? `${"active"}` : "");

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goHome = () => {
    navigate("/");
  };

  const logoutUser = () => {
    dispatch(RESET());
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="header">
      <nav>
        <div className="logo" onClick={goHome}>
          <BiLogIn size={35} />
          <span>ChatterBox</span>
        </div>

        <ul className="home-links">
          <ShowOnLogin>
            <li className="--flex-center">
              <FaUserCircle size={20} />
              &nbsp;
              <UserName />
            </li>
          </ShowOnLogin>
          <ShowOnLogout>
            <li>
              <button className="--btn --btn-primary">
                <Link to="/login">Login</Link>
              </button>
            </li>
          </ShowOnLogout>

          <ShowOnLogin>
            <li>
              <NavLink to="/profile" className={activeLink}>
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink to="/chat" className={activeLink}>
                Chat
              </NavLink>
            </li>

            <li>
              <button className="--btn --btn-secondary"
               onClick={logoutUser}
               >
                Logout
              </button>
            </li>
          </ShowOnLogin>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
