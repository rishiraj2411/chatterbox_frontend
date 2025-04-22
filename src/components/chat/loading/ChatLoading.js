import { Stack } from "@chakra-ui/layout";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

const ChatLoading = () => {
    return (
        <Stack>
            <Skeleton height="45px" />
            <Skeleton height="45px" />
            <Skeleton height="45px" />
            <Skeleton height="45px" />
            <Skeleton height="45px" />
            <Skeleton height="45px" />
            <Skeleton height="45px" />          
        </Stack>
    );
};

export default ChatLoading;