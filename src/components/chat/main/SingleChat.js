import { Box, Text } from "@chakra-ui/layout";
import "./styles.css";
import { useEffect, useRef, useState } from "react";
import ProfileModal from "../profile/ProfileModal";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";
import UpdateGroupChatModal from "../profile/UpdateGroupChatModal";
import { allMessages, setSelectedChatId, sendMessage, setNotification } from "../../../redux/reducer/chatSlice"
import { useDispatch, useSelector } from "react-redux";

const ENDPOINT = "http://localhost:5000";

var socket;

const SingleChat = () => {

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { chatMessage, chats, selectedChatId, notification } = useSelector((state) => state.chat);

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [socketConnected, setSocketConnected] = useState(false);

    const currentChatInfo = chats.find((chat) => chat._id === selectedChatId);
    const secondUser = currentChatInfo?.users?.find((u) => u._id !== user._id);

    const inputRef = useRef(null);

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("setup", user);
        socket.on("connected", () => setSocketConnected(true));

        return () => {
            socket.disconnect();
        };
    }, [user]);

    const boxRef = useRef(null);

    useEffect(() => {
        // Scroll to the bottom when messages change
        if (boxRef.current) {
            boxRef.current.scrollTop = boxRef.current.scrollHeight;
        }
    }, [messages]);

    // fetch all chat message
    useEffect(() => {
        if (selectedChatId !== null) {
            dispatch(allMessages(selectedChatId));

            //Join socket chat room name selectedId
            socket.emit("join chat", selectedChatId);
        }
    }, [dispatch, selectedChatId]);

    useEffect(() => {
        if (chatMessage) {
            setMessages(chatMessage);

            if (socketConnected) {
                socket.emit("join chat", selectedChatId);
            }
        }
    }, [chatMessage, selectedChatId, socketConnected]);

    const handleSendMessage = () => {
        if (newMessage.trim() !== "") {
            const data = { chatId: selectedChatId, content: newMessage, senderId: user._id };
            dispatch(sendMessage(data));

            //send all data to the socket with all required data
            const socketData = { chat: currentChatInfo, content: newMessage, sender: user };
            socket.emit("new message", socketData);
            setMessages([...messages, socketData]);

            setNewMessage("");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            handleSendMessage();
        }
    };

    const handleInputClick = () => {
        inputRef.current.select();
    };

    useEffect(() => {
        socket.on("message received", (newMessageReceived) => {
            if (selectedChatId === null || selectedChatId !== newMessageReceived.chat._id) {
                if (!notification.includes(newMessageReceived)) {
                    dispatch(setNotification(newMessageReceived));
                }
            } else {
                setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
            }
        }, [selectedChatId, notification, dispatch]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {(selectedChatId !== null) ? (
                <>
                    <div className="your-text-container">
                        <button
                            className="--btn --btn-primary"
                            onClick={() => {
                                dispatch(setSelectedChatId(null))
                            }}
                        >
                            <img
                                width="30"
                                height="30"
                                src="https://img.icons8.com/ios-filled/50/back.png"
                                alt="back" />
                        </button>

                        {messages &&
                            (!currentChatInfo.isGroupChat ? (
                                <>
                                    {secondUser.name.toUpperCase()}
                                    <ProfileModal user={secondUser} />
                                </>
                            ) : (
                                <>
                                    {currentChatInfo.chatName.toUpperCase()}
                                    <UpdateGroupChatModal />
                                </>
                            ))}
                    </div>

                    <Box
                        display="contents"
                        flexDir="column"
                        w="100%"
                        h="100%"
                    >
                        <Box
                            ref={boxRef}
                            w="100%"
                            flex="1"
                            p={3}
                            bg="#E8E8E8"
                            overflowY="auto"
                        >
                            {messages.length > 0 ? (
                                <div className="messages">
                                    <ScrollableChat messages={messages} />
                                </div>
                            ) : (
                                <p className="--flex-center">No messages available.</p>
                            )}
                        </Box>

                        <form className="--dis-flex --p --btn-block">

                            <input
                                ref={inputRef}
                                className="--btn-block --px"
                                placeholder="Type a message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyDown={(e) => handleKeyPress(e)}
                                onClick={handleInputClick}
                                autoFocus
                            />
                            <button
                                className="--btn --btn-primary"
                                onClick={handleSendMessage}
                            >
                                Send
                            </button>
                        </form>
                    </Box>
                </>
            ) : (
                // At initial stage 
                <Box display="flex" alignItems="center" justifyContent="center" h="100%">
                    <Text fontSize="3xl" pb={3} >
                        Click on a user to start chatting
                    </Text>
                </Box>
            )}
        </>
    );
};

export default SingleChat;