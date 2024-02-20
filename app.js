import Server from "./configs/server.js";
import dotenv from "dotenv";

dotenv.config();

const servidor = new Server();

servidor.startServer();