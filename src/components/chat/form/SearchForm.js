import React, { useEffect, useState } from "react";
import UserListItem from "../userAvatar/UserListItem";
import { ReactComponent as LoadingAnimation } from "../../../animation/Spinner-1s-200px.svg";

const SearchForm = ({handleUserIdResult, AvailableUsers }) => {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        const filteredUsers = AvailableUsers.filter((user) =>
            user.name.toLowerCase().includes(search.toLowerCase())
        );
        setSearchResult(filteredUsers);
    }, [AvailableUsers, search]);

    const handleSearch = (query) => {
        setSearch(query);
    };

    return (
        <form className="--px2 --form-control">
            <input
                type="text"
                className="--btn-block"
                placeholder="Add User to group"
                name="AddUser"
                value={search}
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
            />
            {search === "" || search === " " ? (
                <></>
            ) : (
                <>
                    {!searchResult ? (
                        <LoadingAnimation />
                    ) : searchResult.length === 0 ? (
                        <p>No users found</p>
                    ) : (
                        <div className="searchList">
                            {searchResult.map((user) => (
                                <UserListItem
                                    key={user._id}
                                    user={user}
                                    handleFunction={() => {
                                        console.log("User ID:", user._id);
                                        handleUserIdResult(user._id); // Log the user ID
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </>
            )}
        </form>
    );
};

export default SearchForm;
