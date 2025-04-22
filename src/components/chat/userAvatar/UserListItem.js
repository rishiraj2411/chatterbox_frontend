import React from 'react';
import './UserListItem.css'; // Import your CSS file
import defaultImg from "../../../assets/avatarr.png"

const UserListItem = ({ user, handleFunction }) => {

    const handleImageError = (event) => {
        event.target.src = defaultImg; 
    };

    return (
        <div
            onClick={() => handleFunction(user)}
            className="user-list-item"
        >
            <img
                alt="i"
                src={user?.photo.url === undefined ? user.photo : user?.photo.url}
                onError={handleImageError}
                className="avatar"
            />
            <div className="user-details">
                <p>{user.name}</p>
                <p className="email">
                    <b>Email: </b>
                    {user.email}
                </p>
            </div>
        </div>
    );
};

export default UserListItem;
