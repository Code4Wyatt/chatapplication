import { Server, Socket } from "socket.io";
import { nanoid } from "nanoid";
import logger from "./utils/logger";

const EVENTS = {
  connection: "connection",
  CLIENT: {
    CREATE_ROOM: "CREATE_ROOM",
  },
  SERVER: {
      ROOMS: "ROOMS",
      JOINED_ROOM: "JOINED_ROOM",
  }
};

const rooms: Record<string, { name: string }> = {};

function socket({ io }: { io: Server }) {
  logger.info(`Sockets enabled`);

  io.on("connection", (socket: Socket) => {
    logger.info(`User connected ${socket.id}`);

    socket.on(EVENTS.CLIENT.CREATE_ROOM, ({ roomName }) => {
      console.log({ roomName });
      

      // Create a roomId
      const roomId = nanoid();

     
      // Add a new room to the rooms object
      rooms[roomId] = { name: roomName };

      socket.join(roomId);

      // Broadcast an event declaring the new room
      socket.broadcast.emit(EVENTS.SERVER.ROOMS, rooms)

      // Emit back to the room creator with all the rooms created
      socket.emit(EVENTS.SERVER.ROOMS, rooms)
      socket.emit(EVENTS.SERVER.JOINED_ROOM, rooms)
      
      // Emit back to room created saying they have joined a room
    });
  });
}

export default socket;
