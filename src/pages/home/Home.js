import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import loginImg from "../../assets/login.svg"; // Optional, can replace with Lottie

const Home = () => {
  return (
    <>
    <div className="main-hero">
      <div className="hero-left">
        <h1 className="hero-title">Connect Instantly.</h1>
        <p className="hero-tagline">
          Fast. Secure. Real-time chat made simple.
        </p>
        <p className="hero-description">
          Join ChatterBox — your new favorite place to chat with friends and stay connected. Built with the power of the MERN stack.
        </p>
        <div className="hero-actions">
          <Link to="/register" className="btn-glow">Join Now</Link>
          <Link to="/login" className="btn-outline">Already have an account?</Link>
        </div>
      </div>

      <div className="hero-right">
        <img src={loginImg} alt="Chat Illustration" />
      </div>
    </div>
    </>
  );
};

export default Home;
