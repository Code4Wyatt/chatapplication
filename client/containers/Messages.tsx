import { useSockets } from "../context/socket.context";

function MessagesContainer() {
    const { socket, messages, roomId, username} = useSockets()
    return <p>Messages</p>
}

export default MessagesContainer