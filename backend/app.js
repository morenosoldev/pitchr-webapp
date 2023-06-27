const express = require("express");
const conn = require("./utils/database.js");
const cors = require("cors");
const app = express();
const http = require("http");
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

require("./routes/auth/auth.routes.js")(app);
require("./routes/chat/chat.routes.js")(app);
require("./routes/files/files.routes.js")(app);
require("./routes/financials/financials.routes.js")(app);
require("./routes/deck/deck.routes")(app);
require("./routes/pitch/pitch.routes.js")(app);
require("./routes/profile/profile.routes.js")(app);
require("./routes/team/team.routes.js")(app);
require("./routes/views/view.routes.js")(app);

const server = http.createServer(app, {
  cors: {
    origin: "http://localhost:3000, http://www.pitcha.net/",
    methods: ["GET", "POST"],
  },
});
const SocketServer = require("./socket");
SocketServer(server);

conn.sync();

server.listen(port, () => {});
