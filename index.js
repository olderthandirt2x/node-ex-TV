const express = require("express");
const app = express();

app.use(express.json()); // Required to parse JSON request body

// Array to store messages
const messages = [];

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.post("/messages", (req, res) => {
  const message = req.body.message;
  console.log("Received message:", message);

  // Store the message in the messages array
  messages.push(message);

  res.send("Message received!");
});

app.get("/messages/latest", (req, res) => {
  // Retrieve the latest message from the messages array
  const latestMessage = messages[messages.length - 1];

  res.json({ message: latestMessage });
  console.log(res.json);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running...");
});
