import axios from "axios";

const BACKEND_URL = (process.env.REACT_APP_BACKEND_URL || "http://localhost:5000");
export const API_URL = `${BACKEND_URL}/api/v1/`;

// Access Chat
const accessChat = async (userData) => {
    const response = await axios.post(API_URL + "chat/", userData, {
        withCredentials: true,
    });
    return response.data;
};

// fetch Chats
const fetchChats = async () => {
    const response = await axios.get(API_URL + "chat/");
    return response.data;
};

// create Group Chat
const createGroupChat = async (userData) => {
    const response = await axios.post(API_URL + "chat/createGroupChat", userData);
    return response.data;
};

// create Group Chat
const updateGroupName = async (userData) => {
    const response = await axios.put(API_URL + "chat/updateGroupName", userData);
    return response.data;
};

// Remove user from Group Chat
const groupRemove = async (userData) => {
    const response = await axios.put(API_URL + "chat/groupRemove", userData);
    return response.data;
};

// Remove user in Group Chat
const groupAdd = async (userData) => {
    const response = await axios.put(API_URL + "chat/groupAdd", userData);
    return response.data;
};

// Remove user in Group Chat
const allMessages = async (chatId) => {
    const response = await axios.get(API_URL + `message/${chatId}`);
    return response.data;
};

// Remove user in Group Chat
const sendMessage = async (userData) => {
    const response = await axios.post(API_URL + "message/", userData);
    return response.data;
};


const chatService = {
    accessChat,
    fetchChats,
    createGroupChat,
    updateGroupName,
    groupRemove,
    groupAdd,
    allMessages,
    sendMessage
};

export default chatService;