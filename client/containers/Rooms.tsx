import { useSockets } from "../context/socket.context";
import { useRef } from "react";
import EVENTS from "../config/events";

function RoomsContainer() {
  const { socket, roomId, rooms } = useSockets();
  const newRoomRef = useRef(null);

  function handleCreateRoom() {
      // Get the room name
      const roomName = newRoomRef.current.value || ''

      if (!String(roomName).trim()) return;

      // Emit room created event
      socket.emit(EVENTS.CLIENT.CREATE_ROOM, {roomName})

      // Set room name input to empty string again
      newRoomRef.current.value = ""
  }

  function handleJoinRoom(key){
    if(key === roomId) return

    socket.emit(EVENTS.CLIENT.JOIN_ROOM, key)
   }

  return (
    <nav>
      <div>
        <input ref={newRoomRef} placeholder="Room name" />
        <button onClick={handleCreateRoom}>CREATE ROOM</button>
      </div>

    {Object.keys(rooms).map((key) => {
        return <div key={key}><button onClick={() => handleJoinRoom(key)} title={`Join ${rooms[key].name}`}disabled={key === roomId}>{rooms[key].name}</button></div>
    })}

    </nav>
  );
}

export default RoomsContainer;
