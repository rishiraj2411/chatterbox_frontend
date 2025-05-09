import React from "react";
import { useDispatch } from "react-redux";
import {
  RESET,
  sendVerificationEmail,
} from "../../../redux/reducer/authSlice";
import "./Notification.css";

const Notification = () => {
  const dispatch = useDispatch();
  const sendVerEmail = async () => {
    await dispatch(sendVerificationEmail());
    await dispatch(RESET());
  };

  return (
    <div className="container">
      <div className="alert">
        <p className="--text-light">
          <b>Message: </b> &nbsp;
        </p>
        <p className="--text-light">
          To verify your account, check your email for a verification link.
          &nbsp;
        </p>
        <p className="v-link" onClick={sendVerEmail}>
          <b> Resend Link</b>
        </p>
      </div>
    </div>
  );
};

export default Notification;
