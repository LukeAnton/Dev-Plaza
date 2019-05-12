//bring in express
const express = require("express");
//init app variable with express
const app = express();
//testing endpoint
app.get("/", (req, res) => res.send("API Running"));
//init PORT variable
const PORT = process.env.PORT || 5000;
//getting the app variable and listening on a port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

//refer to json script for server initialisation
// "scripts": {
//   "start": "node server",
//   "server": "nodemon server"
// },
