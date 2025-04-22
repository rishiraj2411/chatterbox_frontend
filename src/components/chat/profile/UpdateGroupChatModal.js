import { useEffect, useState } from "react";
import UserBadgeItem from "../userAvatar/UserBadgeItem.js";
import { getUsers } from "../../../redux/reducer/authSlice.js"
import { updateGroupName, groupRemove, groupAdd, fetchChats} from "../../../redux/reducer/chatSlice.js"
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SearchForm from "../form/SearchForm.js";
import { FaUserCircle } from "react-icons/fa";

const UpdateGroupChatModal = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const [groupChatName, setGroupChatName] = useState("");

    const { user, users } = useSelector((state) => state.auth);
    const { chats, selectedChatId } = useSelector((state) => state.chat);

    const selectedChat = chats.find((chat) => chat._id === selectedChatId);

    const selectedChatUsersList = selectedChat.users.map((user) => user._id);
    const AvailableUsers = users.filter((user) => !selectedChatUsersList.includes(user._id));

    //Done
    const handleRemove = async (user1) => {
        if (selectedChat.groupAdmin._id === user._id ) {

            try {
                const userData = {
                    chatId: selectedChatId,
                    userId: user1._id
                }
                await dispatch(groupRemove(userData));
                await dispatch(fetchChats());

            } catch (error) {
                toast.error(error);
            }     
        }else{
            toast.error("Only admins can remove someone!");
            return;
        }     
    };

    const AddUserInGroup = async (userId) => {

        if (selectedChat.groupAdmin._id === user._id) {

            try {
                console.log(userId)

                const userData = {
                    chatId: selectedChatId,
                    userId: userId
                }
                await dispatch(groupAdd(userData));
                await dispatch(fetchChats());

            } catch (error) {
                toast.error(error);
            }
        } else {
            toast.error("Only admins can Add someone!");
            return;
        }  

    };

    //Done
    const handleInputChange = (e) => {
        setGroupChatName(e.target.value);
    };

    const updateGroupSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            chatId: selectedChatId,
            chatName: groupChatName,
        };
        await dispatch(updateGroupName(userData));
        await dispatch(fetchChats());
        setIsOpen(false);
    };

    useEffect(() => {
        dispatch(getUsers());
        dispatch(fetchChats());
    }, [dispatch]);

    return (

        <>
            <button onClick={openModal}>
                <FaUserCircle size={30} />
            </button>

            {isOpen && (
                <div className="modal-overlay" >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title">  {selectedChat.chatName}</h1>
                            <button className="modal-close" onClick={closeModal}>
                                &times;
                            </button>
                        </div>

                        <div className="modal-body">
                            {selectedChat.users.map((u) => (
                                <UserBadgeItem
                                    key={u._id}
                                    user={u}
                                    admin={selectedChat.groupAdmin}
                                    handleFunction={() => handleRemove(u)}
                                />
                            ))}
                        </div>
                        <div>
                            <form className="--px2 --form-control updateForm" onSubmit={updateGroupSubmit}>
                                <input
                                    type="text"
                                    placeholder="Chat Name"
                                    name="groupChatName"
                                    value={groupChatName}
                                    onChange={handleInputChange} 
                                />

                                <button type="submit" className="--btn --btn-primary --btn-block">
                                    Update
                                </button>
                            </form>

                            <SearchForm
                                handleUserIdResult={AddUserInGroup}
                                AvailableUsers={AvailableUsers}
                            />
                        </div>
                        <div className="modal-footer ">
                            <button className="close-button --btn --mr2" 
                            onClick={() => handleRemove(user)}
                            >
                                Leave Group
                            </button>
                            <button className="close-button --btn" onClick={closeModal}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>

    );
};

export default UpdateGroupChatModal;