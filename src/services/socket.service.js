import chatService from "./chat.service.js";

class SocketService {
  async connect(io) {
    //Event for joining
    io.on("connection", (socket) => {
      console.log("a user connected");
      socket.on("join", async (roomId, userId) => {
        console.log("Join", roomId, userId);

        socket.join(roomId);

        try {
          const chatHistory = await chatService.getRoomDetails(roomId);
          if (chatHistory && chatHistory.length > 0) {
            return chatHistory;
          }
          io.to(roomId).emit("chatHistory", chatHistory);
          return null;
        } catch (error) {
          console.log(`EventName | Join - Error, errorMessage - ${e.message}`);
          socket.emit("error", "Internal Server Error");
        }
      }),

      //Event for sending message
        socket.on("message", async (data) => {
          const { roomId, senderId, message } = data;
          try {
            const addMessageToDB = await chatService.insertMessage(
              roomId,
              senderId,
              message
            );

            io.to(roomId).emit("message", {
              message,
              timestamp: new Date(),
              senderId,
            });
          } catch (error) {
            console.log(
              `EventName | Message - Error, errorMessage - ${e.message}`
            );
            socket.emit("error", "Internal Server Error");
          }
        });

      socket.on("disconnect", () => {
        console.log("user disconnected");
      });
    });
  }
}

export default new SocketService();
