import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import chatService from "../service/chatService";

const initialState = {
    isLoading: false,
    chatLoading:false,
    messageLoading: false,
    selectedChatId: null,
    chats: [],
    chatMessage:[],
    notification: [],
    message : "",
};

// Access Chat // create one by one chat
export const accessChat = createAsyncThunk("chat/accessChat",async (userData, thunkAPI) => {
        try {
            return await chatService.accessChat(userData);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
                console.log(message)
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Fetch Chats  // get all chats
export const fetchChats = createAsyncThunk("chat/fetchChats", async (_,thunkAPI) => {
    try {
        return await chatService.fetchChats();
    } catch (error) {
        return thunkAPI.rejectWithValue("Failed to fetch chats");
    }
});

// Create Group Chat
export const createGroupChat = createAsyncThunk("chat/createGroupChat",async (userData,thunkAPI) => {
        try {
            return await chatService.createGroupChat(userData);
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to create group chat");
        }
    }
);

// Update Group Name
export const updateGroupName = createAsyncThunk("chat/updateGroupName", async (userData, thunkAPI) => {
        try {
            console.log(userData)
            return await chatService.updateGroupName(userData);
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to update group name");
        }
    }
);

// Remove User from Group Chat
export const groupRemove = createAsyncThunk(
    "chat/groupRemove",
    async (userData, thunkAPI) => {
        try {
            return await chatService.groupRemove(userData);
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to remove user from group chat");
        }
    }
);

// Add User to Group Chat
export const groupAdd = createAsyncThunk("chat/groupAdd", async (userData, thunkAPI) => {
    try {
        return await chatService.groupAdd(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue("Failed to add user to group chat");
    }
});

// Fetch All Messages
export const allMessages = createAsyncThunk(
    "chat/allMessages",
    async (chatId,thunkAPI) => {
        try {
            return await chatService.allMessages(chatId);
        } catch (error) {
            console.log(error)
            return thunkAPI.rejectWithValue("Failed to fetch messages");
        }
    }
);

// Send Message
export const sendMessage = createAsyncThunk(
    "chat/sendMessage",
    async (userData, thunkAPI) => {
        try {
            return await chatService.sendMessage(userData);
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to send message");
        }
    }
);

const chatSlice = createSlice({
    
    name: "chat",
    initialState,
    reducers: {
        CHAT_RESET: (state) => {
            // Reset any specific state properties if needed
            state.errorMessage = "";
        },
        setSelectedChatId: (state, action) => {
            state.selectedChatId = action.payload;
        },
        setNotification: (state, action) => {
             state.notification = [action.payload, ...state.notification];
        },
        removeNotification: (state, action) => {
            const removeId = action.payload;
            console.log(removeId);

            if (removeId !== undefined) {
                console.log(state.notification, "0");

                const filteredNotification = state.notification.filter(
                    (item) => item?.chat?._id.toString() !== removeId.toString()
                );
                console.log(filteredNotification, "1");
                state.notification = filteredNotification;
            }
        },
    },
    extraReducers: (builder) => {
        builder

            // Access Chat (Create one-on-one chat)
            .addCase(accessChat.pending, (state) => {
                state.isLoading = true;
                state.chatLoading = true;
            })
            .addCase(accessChat.fulfilled, (state, action) => {
                
                state.isLoading = false;
                state.chatLoading = false;
                if (action.payload && action.payload.chatId) {
                    console.log(action.payload.chatId)
                    state.selectedChatId = action.payload.chatId;
                }

                state.message = action.payload;
            })
            .addCase(accessChat.rejected, (state, action) => {
                state.isLoading = false;
                state.chatLoading = false;
                state.errorMessage = action.payload;
                toast.error(action.payload);
            })

            // Fetch All Chats
            .addCase(fetchChats.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchChats.fulfilled, (state, action) => {
                state.isLoading = false;
                state.chats = action.payload;
            })
            .addCase(fetchChats.rejected, (state, action) => {
                state.isLoading = false;
                state.errorMessage = action.payload;
                toast.error(action.payload);
            })

            // Create Group Chat
            .addCase(createGroupChat.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createGroupChat.fulfilled, (state, action) => {
                state.isLoading = false;
                state.message = action.payload;
                toast.success(action.payload);
            })
            .addCase(createGroupChat.rejected, (state, action) => {
                state.isLoading = false;
                state.errorMessage = action.payload;
                toast.error(action.payload);
            })

            // Update Group Name
            .addCase(updateGroupName.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateGroupName.fulfilled, (state, action) => {
                state.isLoading = false;
                state.message = action.payload;
                toast.success(action.payload);
            })
            .addCase(updateGroupName.rejected, (state, action) => {
                state.isLoading = false;
                state.errorMessage = action.payload;
                toast.error(action.payload);
            })

            // Remove user from group
            .addCase(groupRemove.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(groupRemove.fulfilled, (state, action) => {
                state.isLoading = false;
                state.message = action.payload;
                toast.success(action.payload);
            })
            .addCase(groupRemove.rejected, (state, action) => {
                state.isLoading = false;
                state.errorMessage = action.payload;
                toast.error(action.payload);
            })

            // Add User in group
            .addCase(groupAdd.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(groupAdd.fulfilled, (state, action) => {
                state.isLoading = false;
                state.message = action.payload;
                toast.success(action.payload);
            })
            .addCase(groupAdd.rejected, (state, action) => {
                state.isLoading = false;
                state.errorMessage = action.payload;
                toast.error(action.payload);
            })

            // send messages
            .addCase(sendMessage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.chatMessage = [...state.chatMessage, action.payload];
                // state.message = action.payload;
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.isLoading = false;
                state.errorMessage = action.payload;
                toast.error(action.payload);
            })

            // Fetch Chats messages
            .addCase(allMessages.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(allMessages.fulfilled, (state, action) => {
                state.isLoading = false;
                state.chatMessage = action.payload;
            })
            .addCase(allMessages.rejected, (state, action) => {
                state.isLoading = false;
                state.errorMessage = action.payload;
                toast.error(action.payload);
            })

            // Default Case
            // .addDefaultCase((state) => {
            //     // Handle default case if needed
            // });
    },
});

export const { CHAT_RESET, setSelectedChatId, setNotification, removeNotification } = chatSlice.actions;

export default chatSlice.reducer;