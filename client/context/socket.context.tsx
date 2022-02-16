import io from "socket.io-client"
import { SOCKET_URL } from "../config/default"
import { createContext, useContext } from "react"

const socket = io(SOCKET_URL)

const SocketContext = createContext({})

function SocketsProvider(props: any) {
    return <SocketContext.Provider value={{ socket }}>
        {...props}
     </SocketContext.Provider>
}

export const useSockets = () => useContext(SocketContext);


export default SocketsProvider
