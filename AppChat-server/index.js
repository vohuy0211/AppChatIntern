import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Routes from "./src/Routes/index.js"
import {Server} from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    path: "http://localhost:8080",
});

const PORT = 3000;
dotenv.config();

app.use(cors());
app.use(express.json());

Routes(app);

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Kết nối mongoDB thành công");
}).catch((err) => {
    console.log(err.message);
})

app.set("io", io); 

io.on("connection", (socket) => {
    console.log("Người dùng đã kết nối:", socket.id);
    io.to(socket.id).emit("message", "Chào mừng đến với ứng dụng chat!");
});

app.listen(PORT, () => {
    console.log(`Server chạy thành công trong http://localhost:${PORT}`);
});