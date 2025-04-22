import React from "react";
import loaderImg from "../../assets/loader.gif";
import "./loader.css";

const Loader = () => {
    return (
        <div className="wrapper">
            <div className="loader">
                <img src={loaderImg} alt="Loading..." />
            </div>
        </div>
    );
};

export const SpinnerImg = () => {
    return (
        <div className="--center-all">
            <img src={loaderImg} alt="Loading..." />
        </div>
    );
};

export default Loader;
