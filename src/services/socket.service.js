import chatService from "./chat.service";

class SocketService{
    async connect(io) {
        io.on('connection', (socket) => {
            console.log('a user connected');

            socket.on('join',async (roomId,userId)=> {
                console.log('Join',roomId,userId);

                socket.join(roomId);

                try {
                    const chatHistory = await chatService.getRoomDetails(roomId);
                    if(chatHistory && chatHistory.length > 0){
                        return chatHistory;
                    }
                    io.to(roomId).emit('chatHistory',chatHistory);
                    return null;
                    
                } catch (error) {
                    console.log(`EventName | Join - Error, errorMessage - ${e.message}`);
                    socket.emit('error','Internal Server Error')
                    
                }
            },),

            socket.on('disconnect', () => {
                console.log('user disconnected');
            })
        })
    }
}

export default new SocketService();