class SocketService{
    async connect(io) {
        io.on('connection', (socket) => {
            console.log('a user connected');

            socket.on('disconnect', () => {
                console.log('user disconnected');
            })
        })
    }
}

export default new SocketService();