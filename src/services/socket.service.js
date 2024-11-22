import chatService from "./chat.service.js";

class SocketService {
  async connect(io) {
    //Event for joining
    io.on("connection", (socket) => {
      console.log("a user connected");
      socket.on("join", async (data) => {
        console.log(`Join event ${data}`);

        const { roomId, userId } = data;
        console.log(`Join event started ${roomId} :: ${userId}`);

        socket.join(roomId);

        console.log(`Join event completed ${roomId} :: ${userId}`);

        try {
          const chatHistory = await chatService.getRoomDetails(roomId);
          // if (chatHistory && chatHistory.length > 0) {
          //   return chatHistory;
          // }
          console.log(`Passed chathistory is ${chatHistory.messages.length}`);

          io.to(roomId).emit("chatHistory", chatHistory);
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

            console.log(
              `Result of the added message in the message event is ${addMessageToDB}`
            );

            io.to(roomId).emit("message", {
              senderId,
              _id: addMessageToDB._id,
              content: message,
              timestamp: new Date(),
            });

            console.log("Execution reached after message event is triggered");
          } catch (error) {
            console.log(
              `EventName | Message - Error, errorMessage - ${error.message}`
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
