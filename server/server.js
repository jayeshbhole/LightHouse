require("dotenv");
require("dotenv/config");
require("./database");

// dependent stuff
const express = require("express");
const cors = require("cors");
const app = express();
const apiRoutes = require("./api/apiRoutes");

app.use(cors());
app.use(express.json());

// routes
app.use("/api", apiRoutes);
app.get("/", (req, res) => res.json("Project-Flow here!"));

// Firing up the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
