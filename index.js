require('dotenv').config(); // Load environment variables from .env file

const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json()); // Required to parse JSON request body

// Connect to MongoDB using Mongoose
const mongoDbUrl = process.env.MONGO_DB_URL;

mongoose
  .connect(mongoDbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB with .env"))
  .catch(err => console.error("Could not connect to MongoDB:", err));

// Define a schema for your collection
const movieSchema = new mongoose.Schema({
  adult: Boolean,
  id: Number,
  original_title: String,
  popularity: Number,
  video: Boolean,
});

// Create a model using the schema
const Movie = mongoose.model("movie3", movieSchema);



  // Array to store messages
const messages = [];

app.get("/", (req, res) => {
  res.send("Hello, world from Render");
});

app.post("/messages", (req, res) => {
  const message = req.body.message;
  console.log("Received message:", message);

    try {
      // Fetch movies from the database and sort by popularity in descending order
      const movies = await Movie.find().sort({ popularity: -1 });
  
      res.json(movies);
      
      console.log(movies);

    } catch (error) {
      console.error("Error fetching movies:", error);
      res.status(500).json({ error: "An error occurred while fetching movies" });
    }
  });
  

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
