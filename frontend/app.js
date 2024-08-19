require("dotenv").config();
const express = require("express");
const routes = require("./src/routes/routes.js");
const cors = require("cors");

const app = express();
const port = process.env.PORT;

//Static Files
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/assets", express.static(__dirname + "public/assets"));
app.use("/js", express.static(__dirname + "public/js"));

//templating engine
app.set("view engine", "ejs");

//Routes

app.use(cors());
app.use(routes);

//liste to port
app.listen(port, () => {
  console.log(`Escutando na porta: ${port}`);
});
