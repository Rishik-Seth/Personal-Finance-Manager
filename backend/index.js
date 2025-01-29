import express from "express";
import connectDB from "./config/connectDB.js";
import {PORT} from "./config/serverConfig.js";
import bodyParser from "body-parser";
import apiRoutes from "./routes/index.js";
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";

const setUpAndStartServer = () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    connectDB();
    app.use("/api", apiRoutes);
    app.use(errorHandlerMiddleware);
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));  
}

setUpAndStartServer();






