const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const socketio = require("socket.io");
const PORT = 3000;

const server = http.createServer(app);

const io = socketio(server);

io.on("connection", (socket) => {
  socket.on("send-location", (data) => {
    io.emit("recieve-location", { id: socket.id, ...data });
  });

console.log('connected');
  socket.on('disconnect',() => {
    io.emit("User-disconnected",socket.id);
  })
});

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

server.listen(PORT, () => {
  console.log(`server is running in http://localhost:${PORT}`);
});
