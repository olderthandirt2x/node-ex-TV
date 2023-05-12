const express = require("express");
const app = express();

app.use(express.json()); // Required to parse JSON request body

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.post("/messages", (req, res) => {
  const message = req.body.message;
  console.log("Received message:", message);

  // Here you can process the message, store it, or perform any other actions

  res.send("Message received!");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running...");
});
