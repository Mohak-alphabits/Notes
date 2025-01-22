const express = require("express");
const userRoutes = require("./Routes/userRoutes");
const connectMongoose = require("./database/dbConnect")
const cors = require("cors");
const cookieParser = require("cookie-parser");
const notesRoutes = require("./Routes/notesRoutes");

require('dotenv').config()
connectMongoose()
const app = express();
app.use(cookieParser());
const port = 5000;

app.use(express.json());
  app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
)
app.use("/api", userRoutes);
app.use("/api", notesRoutes);

app.listen(port, () => {
  console.log('Server running');
});

