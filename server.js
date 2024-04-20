const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const routes = require("./routes");

const app = express();
app.use(express.json());
app.use("/", routes);
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(
    `The server is running successfully on port: ${PORT}, http://localhost:${PORT}`
  );
});
