import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import apiRouter from './controllers/index.js';
import connectDB from "./db/index.js";
import socketService from "./services/socket.service.js";



const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origin : process.env.CORS_ORIGIN,
		methods : ['GET', 'POST'],
		credentials : false
    }
})

const PORT = process.env.PORT || 2626;
const HOST = process.env.HOST;




const registerMiddlewares = function () {
    try {
        app.use(express.json({
            limit:'16kb'
        }))

        app.use(bodyParser.json())

        app.use(express.json())
        
        app.use(express.urlencoded({
            extended:true,limit:'16kb'
        }))
        
        app.use(express.static('public'))
        
        app.use(cookieParser())

        
    } catch (error) {
        console.log(`Error while registering middlewares :: ${error}`);
        throw error;
    }
}


const registerRoutes = () => {
    try {
        app.use('/v1', apiRouter);
    } catch (error) {
        console.log(`Error while registering routes :: ${error}`);
    }
}

const startApp = () => {
    try {
        //register middlewares of the application
        registerMiddlewares();

        registerRoutes();
        

        socketService.connect(io);

        connectDB()
            .then(() => {
                server.listen({ port: PORT, host: HOST })
                .on('error', (error) => {
                    if (error.syscall !== 'listen') {
                        throw error;
                    }
                    switch (error.code) {
                        case 'EACCES':
                          console.log(`BOOT :: ${HOST}:${PORT} requires elevated privileges`);
                          process.exit(1);
                          break;
                        case 'EADDRINUSE':
                          bootLogger.error(`BOOT :: ${HOST}:${PORT} is already in use`);
                          process.exit(1);
                          break;
                        default:
                          throw error;
               }
                })
                .on('listening', () => {
                    console.log(`Application is running on :: ${HOST}:${PORT}`);
            })
    })
    } catch (error) {
        console.log(`Error while staring the app :: ${error}`);
        throw error;
    }

}


export { startApp };
