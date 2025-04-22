import React, { useEffect, useState } from "react";
import "./auth.css";
import { MdPassword } from "react-icons/md";
import Card from "../../components/global/card/Card";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RESET, resetPassword } from "../../redux/reducer/authSlice";
import Loader from "../../components/loader/Loader";
import PasswordInput from "../../components/global/passwordInput/PasswordInput";
import PasswordStrengthIndicator from "../../components/global/passwordStrengthIndicator/PasswordStrengthIndicator";

const initialState = {
    password: "",
    password2: "",
};

const ResetPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState(initialState);
    const { password, password2 } = formData;
    const { resetToken } = useParams();

    const [isPasswordValid, setIsPasswordValid] = useState(false);

    const handleStrengthChange = (uCase, num, sChar, passLength) => {
        setIsPasswordValid(uCase && num && sChar && passLength);
    };

    const { isLoading, isError, isSuccess, isLoggedIn, message } = useSelector(
        (state) => state.auth
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const reset = async (e) => {
        e.preventDefault();

        if (password !== password2) {
            return toast.error("Passwords do not match");
        }

        const userData = {
            password,
            password2,
        };

        await dispatch(resetPassword({ userData, resetToken }));
        await dispatch(RESET());
    };

    useEffect(() => {
        if (isSuccess && message.includes("Reset Successful")) {
            navigate("/login");
        }

        dispatch(RESET());
    }, [isError, isSuccess, message, isLoggedIn, dispatch, navigate]);


    return (
        <div className="container auth" >
            {isLoading && <Loader />}
            <Card>
                <div className="form">
                    <div className="--flex-center">
                        <MdPassword size={35} color="#999" />
                    </div>
                    <h2>Reset Password</h2>

                    <form onSubmit={reset}>
                        <PasswordInput
                            placeholder="New Password"
                            required
                            name="password"
                            value={password}
                            onChange={handleInputChange}
                        />

                        <PasswordInput
                            placeholder="Confirm New Password"
                            required
                            name="password2"
                            value={password2}
                            onChange={handleInputChange}
                        />

                        <PasswordStrengthIndicator
                            password={password}
                            onStrengthChange={handleStrengthChange}
                        />

                        <button type="submit"
                            disabled={!isPasswordValid}
                            className={`--btn --btn-primary --btn-block
                            ${isPasswordValid ? '' : '--btn-disabled'}`
                            }
                         >
                            Reset Password
                        </button>
                        <div className="links">
                            <p>
                                <Link to="/">- Home</Link>
                            </p>
                            <p>
                                <Link to="/login">- Login</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </Card>
        </div>
    );
};

export default ResetPassword;
