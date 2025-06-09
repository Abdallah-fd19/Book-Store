import express from "express";
import {PORT, URI} from "./config.js"
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";


const app=express();


app.use(express.json());
// Option 1: Allow All Origins With Default Of Cors;
app.use(cors())
// Option 2: Allow Only Custom Cors;
app.use(cors({
  origin:['https://book-store-8k6.pages.dev/', 'http://localhost:5173'],
  methods:['GET', 'POST', 'PUT', 'DELETE'],
  credentials:true,
}));
app.use('/books', booksRoute);


app.get('/', (req, res) => {
  res.send('Hello from MERN backend!');
});

async function startDBandApp() {
  try {
    await mongoose.connect(URI);
    console.log('App connected to database');
    app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}`);
});

  } catch (error) {
    console.error('Failed to connect to database:', error);
  }
}

startDBandApp();




