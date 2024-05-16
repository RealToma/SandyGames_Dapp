require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const API_PORT = process.env.REACT_APP_PORT_API;
const app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
const path = require('path');
const cors = require("cors");
// const { modalCountsMint } = require("./schema/counts_mint");

const config = require("./config/key");

const controllerTreasure = require("./controller/treasure");
const { router: controllerMint } = require("./controller/mint");
const controllerAdmin = require("./controller/admin");
const { airdropTreasure } = require("./function/treasure");

// connects our back end code with the database
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // strictQuery: false,
  // useFindAndModify: false,
});

let db = mongoose.connection;

db.once("open", () => console.log("MongoDB connected"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/treasure", controllerTreasure);
app.use("/api/mint", controllerMint);
app.use("/api/admin", controllerAdmin);

// airdropTreasure();
app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

// launch our backend into a port

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

io.on("connection", (socket) => {
  console.log("new client connected");
  socket.emit("connection", null);

  // const changeStream = modalCountsMint.watch();
  // changeStream.on("change", (change) => {
  //   console.log(JSON.stringify(change.fullDocument));
  //   socket.send(JSON.stringify(change.fullDocument));
  // });
});
