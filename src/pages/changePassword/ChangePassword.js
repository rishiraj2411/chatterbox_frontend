import React, { useState } from "react";
import Card from "../../components/global/card/Card";
import PageMenu from "../../components/pageMenu/PageMenu";
import PasswordInput from "../../components/global/passwordInput/PasswordInput";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./ChangePassword.css";
import { useDispatch, useSelector } from "react-redux";
import {
  changePassword,
  logout,
  RESET,
} from "../../redux/reducer/authSlice";
import { SpinnerImg } from "../../components/loader/Loader";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { sendAutomatedEmail } from "../../redux/reducer/emailSlice";
import PasswordStrengthIndicator from "../../components/global/passwordStrengthIndicator/PasswordStrengthIndicator";

const initialState = {
  oldPassword: "",
  password: "",
  password2: "",
};

const ChangePassword = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const { oldPassword, password, password2 } = formData;

  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const handleStrengthChange = (uCase, num, sChar, passLength) => {
    setIsPasswordValid(uCase && num && sChar && passLength);
  };

  const { isLoading, user } = useSelector((state) => state.auth);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const updatePassword = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      return toast.error("New passwords do not match");
    }

    const userData = {
      oldPassword,
      password,
    };

    const emailData = {
      subject: "Password Changed - AUTH:Z",
      send_to: user.email,
      reply_to: "noreply@zinotrustacademy.com",
      template: "changePassword",
      url: "/forgotPassword",
    };

    await dispatch(changePassword(userData));
    await dispatch(sendAutomatedEmail(emailData));
    await dispatch(logout());
    dispatch(RESET());
    navigate("/login");
  };

  return (
    <div>
      <section>
        <div className="container">
          <PageMenu />
          <h2>Change Password</h2>
          <div className="--flex-start change-password">
            <Card cardClass={"card"}>
              <form onSubmit={updatePassword}>
                <div>
                  <label>Current Password:</label>
                  <PasswordInput
                    placeholder="Current Password"
                    name="oldPassword"
                    value={oldPassword}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label>New Password:</label>
                  <PasswordInput
                    placeholder="New Password"
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label>New Password:</label>
                  <PasswordInput
                    placeholder="Confirm New Password"
                    name="password2"
                    value={password2}
                    onChange={handleInputChange}
                    onPaste={(e) => {
                      e.preventDefault();
                      toast.error("Cannot paste into input field.");
                      return false;
                    }}
                  />
                </div>
                <PasswordStrengthIndicator
                  password={password}
                  onStrengthChange={handleStrengthChange}
                />

                {isLoading ? (
                  <SpinnerImg />
                ) : (
                  <button
                    disabled={!isPasswordValid}
                      className={`--btn --btn-danger --btn-block --mt
                    ${isPasswordValid ? '' : '--btn-disabled'}`
                    }>
                    Change Password
                  </button>
                )}
              </form>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChangePassword;