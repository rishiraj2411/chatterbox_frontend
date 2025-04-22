import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/reducer/authSlice";
import emailReducer from "../redux/reducer/emailSlice";
import filterReducer from "../redux/reducer/filterSlice";
import chatReducer from "../redux/reducer/chatSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        email: emailReducer,
        filter: filterReducer,
        chat: chatReducer,
    },
});