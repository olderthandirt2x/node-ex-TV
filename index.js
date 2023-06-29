const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json()); // Required to parse JSON request body

// Connect to MongoDB using Mongoose
mongoose
  .connect("mongodb+srv://larry:larry4578@mongo1.pzdj6es.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Could not connect to MongoDB:", err));

// Array to store messages
const messages = [];

app.get("/", (req, res) => {
  res.send("Hello, world from Render");
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

const now = new Date();
console.log(`Server started listening at ${now}`);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running...");
});
