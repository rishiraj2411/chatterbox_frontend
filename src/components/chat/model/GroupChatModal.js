import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../redux/reducer/authSlice.js";
import { createGroupChat, fetchChats } from "../../../redux/reducer/chatSlice.js";
import { Spinner } from "@chakra-ui/react";
import { toast } from "react-toastify";
import UserListItem from "../userAvatar/UserListItem.js";
import UserBadgeItem from "../userAvatar/UserBadgeItem.js";

const GroupChatModal = ({ children }) => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [groupChatName, setGroupChatName] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);

    const { user, users } = useSelector((state) => state.auth);
    const AvailableUserToAddGroup = users.filter((u) => u._id !== user._id);

    const calculateDifferenceUsers = (selected, other) => {
        return other.filter((user) => !selected.some((selectedUser) => selectedUser._id === user._id));
    };

    const handleSearch = (query) => {
        const differenceUsers = calculateDifferenceUsers(selectedUsers, AvailableUserToAddGroup);
        const filteredDifferenceUsers = differenceUsers.filter((user) =>
            user.name.toLowerCase().includes(query.toLowerCase())
        );

        setSearchResult(filteredDifferenceUsers);
    };

    const handleAddUser = (userToAdd) => {
        try {
            setLoading(true);

            if (selectedUsers.some((user) => user._id === userToAdd._id)) {
                alert("User already added");
                return;
            }

            const updatedOtherUsers = AvailableUserToAddGroup.filter((user) => user._id !== userToAdd._id);
            const updatedDifferenceUsers = calculateDifferenceUsers(selectedUsers, updatedOtherUsers);

            setSearchResult(updatedDifferenceUsers);
            setSelectedUsers([...selectedUsers, userToAdd]);

        } catch (error) {
            toast.error(error);
        } finally {
            setLoading(false);
            setSearch("");
        }
    };

    const handleRemoveUser = (userToRemove) => {
        try {
            setLoading(true);

            const updatedSelectedUsers = selectedUsers.filter((user) => user._id !== userToRemove._id);
            const updatedDifferenceUsers = calculateDifferenceUsers(updatedSelectedUsers, AvailableUserToAddGroup);

            setSearchResult(updatedDifferenceUsers);
            setSelectedUsers(updatedSelectedUsers);

        } catch (error) {
            toast.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async() => {
        if (!groupChatName || !selectedUsers.length) {
            alert("Please fill all the fields");
            return;
        }

        const selectedUserIds = selectedUsers.map((user) => user._id);
        const requestData = {
            name: groupChatName,
            users: JSON.stringify(selectedUserIds),
        };

        await dispatch(createGroupChat(requestData));
        await dispatch(fetchChats());
        setIsOpen(false); // Close the modal on successful dispatch
    };


    useEffect(() => {
        dispatch(getUsers());
        dispatch(fetchChats());
    }, [dispatch]);

    return (
        <>
            <span onClick={() => setIsOpen(true)}>{children}</span>

            {isOpen && (
                <div className="addUser-modal">
                    <div className="addUser-modal-content">
                        <div className="addUser-modal-header">
                            <h3>Create Group Chat</h3>
                            <span className="addUser-modal-close" onClick={() => setIsOpen(false)}>
                                &times;
                            </span>
                        </div>
                        <div className="modal-body">
                            {selectedUsers.map((user) => (
                                <UserBadgeItem
                                    key={user._id}
                                    user={user}
                                    handleFunction={() => handleRemoveUser(user)}
                                />
                            ))}
                        </div>
                        <div className="addUser-modal-body">
                            <form className="--px2 --form-control ">
                                <input
                                    type="text"
                                    placeholder="Chat Name"
                                    value={groupChatName}
                                    onChange={(e) => setGroupChatName(e.target.value)}
                                />
                                <input
                                    type="text"
                                    className="--btn-block"
                                    placeholder="Add User to group"
                                    name="AddUser"
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                        handleSearch(e.target.value);
                                    }}
                                />
                                <div className="searchList">
                                    {loading ? (
                                        <Spinner size="lg" />
                                    ) : (
                                        searchResult.map((user) => (
                                            <UserListItem
                                                key={user._id}
                                                user={user}
                                                handleFunction={() => handleAddUser(user)}
                                            />
                                        ))
                                    )}
                                </div>
                            </form>
                        </div>
                        <div className="addUser-modal-footer">
                            <button onClick={handleSubmit}>Create Chat</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default GroupChatModal;
