import React, { useState } from "react";
import "../main/styles.css"; // Import your custom CSS file for styling
import { FaUserCircle } from "react-icons/fa";
import defaultImg from "../../../assets/avatarr.png"

const ProfileModal = ({ user, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleImageError = (event) => {
        event.target.src = defaultImg;
    };

    return (
        <div>
            {children ? (
                <span onClick={openModal}>{children}</span>
            ) : (
                <button onClick={openModal}>
                        <FaUserCircle size={30} />
                </button>
            )}
            {isOpen && (
                <div className="modal-overlay" >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title">{user.name}</h1>
                            <button className="modal-close" onClick={closeModal}>
                                &times;
                            </button>
                        </div>
                        <div className="modal-body">
                            
                            <img
                                alt={user.name}
                                src={user?.photo.url === undefined ? user.photo : user?.photo.url}
                                onError={handleImageError}
                                className="profile-image"
                            />
                            <p className="profile-email">Email: {user.email}</p>
                        </div>
                        <div className="modal-footer">
                            <button className="close-button" onClick={closeModal}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


export default ProfileModal;
