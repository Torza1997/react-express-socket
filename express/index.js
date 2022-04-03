const app = require("express")();
const httpServer = require("http").createServer(app);
const cors = require("cors");
const options = {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Access-Control-Allow-Origin"],
    credentials: true,
  },
};
app.use(cors);
const io = require("socket.io")(httpServer, options);
io.on("connection", (socket) => {
  console.log(`user socket id : ${socket.id}`);
  console.log("someone connected!");
  socket.on("disconnect", () => {
    console.log("someone disconnected");
  });
  socket.on("send to server", (data) => {
    console.log(data.msg);
    io.emit("send message to client", {
      data: data,
      socketID: socket.id,
    });
  });
});
httpServer.listen(9000, () => {
  console.log("listen port 9000");
});
