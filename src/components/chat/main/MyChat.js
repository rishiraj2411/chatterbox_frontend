import { Box, Stack} from "@chakra-ui/layout";
import { useLayoutEffect, useState } from "react";
import { getSender } from "../logic/ChatLogic";
import ChatLoading from "../loading/ChatLoading";
import GroupChatModal from "../model/GroupChatModal";
import { fetchChats, setSelectedChatId, removeNotification } from "../../../redux/reducer/chatSlice"
import { useDispatch, useSelector } from "react-redux";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import SingleChatModal from "../model/SingleChatModal";

const MyChats = () => {

    useRedirectLoggedOutUser("/login");
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { chats, chatLoading, selectedChatId, notification } = useSelector((state) => state.chat);

    const [chatData, setChatData] = useState([]);

    const handleChatClick = (chatId) => {
        dispatch(setSelectedChatId(chatId));
        dispatch(removeNotification(chatId));

    };

    useLayoutEffect(() => {
        dispatch(fetchChats());
    }, [dispatch]);

    useLayoutEffect(() => {
        if (chats) {
            setChatData(chats);
        }
    }, [chats]);

    return (
        <Box
            className={selectedChatId === null ? "" : "none-mobile"}
            flexDir="column"
            alignItems="center"
            p={3}
            bg="white"
            w={{ base: "100%", md: "31%" }}
            borderRadius="lg"
            borderWidth="1px"
        >
            <Box
                pb={3}
                px={3}
                fontSize={{ base: "28px", md: "30px" }}
                display="flex"
                w="100%"
                alignItems="center"
            >
                <SingleChatModal>
                    <button className="--btn --btn-primary">
                        Search User
                    </button>
                </SingleChatModal>

                <GroupChatModal>
                    <button className="--btn --btn-primary">
                        + Create Group Chat
                    </button>
                </GroupChatModal>
            </Box>

            <Box
                d="flex"
                flexDir="column"
                p={3}
                bg="#F8F8F8"
                w="100%"
                h="100%"
                borderRadius="lg"
                overflowY="hidden"
            >
                {!chatLoading && chatData ? (
                    <Stack overflowY="scroll">
                        {chatData.map((chat) => {
                            const notificationsForChat = notification.filter(
                                (item) => item?.chat?._id === chat?._id
                            );

                            return (
                                <Box
                                    onClick={() => handleChatClick(chat._id)}
                                    cursor="pointer"
                                    bg={selectedChatId === chat._id ? "#38B2AC" : "#E8E8E8"}
                                    color={selectedChatId === chat._id ? "white" : "black"}
                                    padding={4}
                                    borderRadius={2}
                                    key={chat._id}
                                >
                                    <div className="--flex-between">
                                        <p className="--text-avg --fw-bold">
                                            {!chat.isGroupChat
                                                ? getSender(user, chat.users)
                                                : chat.chatName}
                                        </p>
                                        {notificationsForChat.length > 0 && (
                                            <p className="--text-p --notification">
                                                {notificationsForChat.length}
                                            </p>
                                        )}
                                    </div>
                                   
                                    <div className="--align-center">
                                        {chat.latestMessage ? (
                                            <>
                                                <p className="--text-p">
                                                    {chat.latestMessage.sender.name} :
                                                </p>
                                                <p className="--text-p --fw-thin">
                                                    {chat.latestMessage.content.length > 50
                                                        ? chat.latestMessage.content.substring(0, 51) + "..."
                                                        : chat.latestMessage.content}
                                                </p>
                                            </>
                                        ) : (
                                            <p className="--text-p --fw-thin">
                                                {"Let's Start Conversation"}
                                            </p>
                                        )}
                                       
                                    </div>
                                </Box>
                            );
                        })}
                    </Stack>
                ) : (
                    <ChatLoading />
                )}
            </Box>
        </Box>
    );
};

export default MyChats;