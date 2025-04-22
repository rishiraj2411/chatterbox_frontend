import {
    isLastMessage,
    isSameSender,
    isSameSenderMargin,
    isSameUser,
} from "../logic/ChatLogic";
import { useSelector } from "react-redux";

const ScrollableChat = ({ messages }) => {
    const { user } = useSelector((state) => state.auth);

    return (
        <>
            {messages &&
                messages.map((m, i) => (
                    <div style={{ display: "flex" }} key={i} >
                        {(isSameSender(messages, m, i, user._id) ||
                            isLastMessage(messages, i, user._id)) && (
                            <div style={{
                                position: 'relative',
                                width:"30px",
                            }}>

                                    <img
                                        width="25px"
                                        height="25px"
                                    style={{
                                        position: 'absolute', bottom: '0', objectFit:"cover",borderRadius:"50%"
                                    }}
                                        name={m.sender.name}
                                        src={m.sender?.photo?.url}
                                        alt=""
                                    />
                                </div>
                            )}
                        <span
                            style={{
                                backgroundColor: `${m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                                    }`,
                                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                                borderRadius: "20px",
                                padding: "5px 15px",
                                maxWidth: "75%",
                            }}
                        >
                            {m.content}
                        </span>
                    </div>
                ))}
        </>
    );
};

export default ScrollableChat;