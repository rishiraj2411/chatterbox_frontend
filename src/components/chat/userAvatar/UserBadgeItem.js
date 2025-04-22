import React from "react";

const UserBadgeItem = ({ user, handleFunction, admin }) => {
    const badgeStyle = {
        padding: "2px 5px",
        borderRadius: "5px",
        margin: "1px",
        fontSize: "12px",
        color: "white",
        background:"purple",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
    };

    const adminStyle = {
        padding: "2px 5px",
        borderRadius: "5px",
        margin: "1px",
        fontSize: "14px",
        color: "white",
        background: "purple",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
    };

    return (
        <span >
            {admin?._id === user?._id ? (
                <span style={adminStyle}>{user.name} ( Admin ) </span>
                
            ) : (
                    <span style={badgeStyle}>
                    {user.name}
                    <span style={{ paddingLeft: "4px", fontSize: "15px" }} onClick={handleFunction}>&times;</span>
                </span>
            )}
        </span>
    );
};

export default UserBadgeItem;
