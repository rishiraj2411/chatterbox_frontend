import { Box } from "@chakra-ui/layout";
import "./styles.css";
import SingleChat from "./SingleChat";
import { useSelector } from "react-redux";

const Chatbox = () => {
    const { selectedChatId } = useSelector((state) => state.chat);

    return (
        <Box
            className={selectedChatId !== null ? "" : "none-mobile"}
            alignItems="center"
            flexDir="column"
            p={3}
            bg="white"
            width={{ base: "100%", md: "68%" }}
            borderRadius="lg"
            borderWidth="1px"
        >
            <SingleChat />
        </Box>
    );
};

export default Chatbox;