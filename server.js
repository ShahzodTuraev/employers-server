const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const http = require("http");
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(
    `The server is running successfully on port: ${PORT}, http://localhost:${PORT}`
  );
});
