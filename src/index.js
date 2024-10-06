import dotenv from "dotenv";
import { startApp } from "./app.js";

dotenv.config({
    path: './env'
});

(async () => {
    try {
        await startApp();
        console.log(`Application running successfully`);
    } catch (error) {
        console.log(`Error in the index file :: ${error}`);
    }
})();