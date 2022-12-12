const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { Server: SocketServer } = require("socket.io");
const http = require("http");
const configuration = require("./config.js");

//  Convierto la aplicacion de express en un servidor http y lo recibe el wss
const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    /* origin: "http://localhost:5173" */
    origin: "*",
  },
});

app.use(cors());
app.use(morgan("dev"));

io.on("connection", (socket) => {
  console.log(`USER CONNECTED: ${socket.id}`);
  //console.log(`User ${server.id} connected`);
  socket.on("message", (message) => {
    const messageAndUser = { message, from: socket.id };
    io.sockets.emit("message", messageAndUser);
  });
});

server.listen(configuration.PORT);
console.log(`Listening on port ${configuration.PORT}`);

/* const express = require("express");
const morgan = require("morgan");
const SocketIO = require("socket.io");
const configuration = require("./config.js");
const cors = require("cors");

const app = express();

app.set("port", configuration.PORT || 3001);

app.use(morgan("dev"));
app.use(cors());

const server = app.listen(app.get("port"), () => {
  console.log(`Server listening on port ${app.get("port")}`);
});

console.log(configuration.SERVER);

const io = SocketIO(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (server) => {
  console.log("CONNECTED");
  console.log(`User ${server.id} connected`);
}); */
