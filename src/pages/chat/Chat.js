import Chatbox from "../../components/chat/main/ChatBox";
import MyChats from "../../components/chat/main/MyChat";
import { useSelector } from "react-redux";
import "./Chat.css"
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";

const ChatPage = () => {
    useRedirectLoggedOutUser("/login");
    const { user } = useSelector((state) => state.auth);
    

    return (
        <div className="chat-page">

            <div className="chat-container">
                {user && <MyChats />}
               {user && (
                    <Chatbox />
                )}     
            </div>
        </div>
    );
};

export default ChatPage;
