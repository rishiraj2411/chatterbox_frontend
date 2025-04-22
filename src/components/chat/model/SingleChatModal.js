import React, { useEffect, useLayoutEffect, useState } from "react";
import {
    Spinner,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../redux/reducer/authSlice";
import { fetchChats, accessChat } from "../../../redux/reducer/chatSlice";
import UserListItem from "../userAvatar/UserListItem";

const SingleChatModal = ({ children }) => {
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    const { user ,users } = useSelector((state) => state.auth);
    const { isLoading } = useSelector((state) => state.chat);

    const handleAddUser = async (user) => {
        let userData = {
            userId: user._id
        }

        await dispatch(accessChat(userData));
        await dispatch(fetchChats());
        setIsOpen(false);
    };

    const handleSearch = (query) => {
        //remove login user from users list
        const otherUsers = users.filter((u) => u._id !== user._id);
        
        const filteredUsers = otherUsers.filter((user) =>
            user.name.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResult(filteredUsers);
    };

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    useLayoutEffect(() => {
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

                        <div className="addUser-modal-body">
                            <form className="--px2 --form-control ">
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
                                    {isLoading ? (
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
                    </div>
                </div>
            )}

        </>
    );
}

export default SingleChatModal;
