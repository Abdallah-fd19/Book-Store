import express from "express";
import {Book} from "../models/models.js";

const router=express.Router();

// Add a book to the database
router.post('/', async (req, res)=>{
  try {
    if(!req.body.title||!req.body.author||!req.body.publishYear){
    return res.status(400).send("Provide title, author, publishYear");
  }
  console.log("Received body:", req.body);
  const newBook={
    title:req.body.title,
    author:req.body.author,
    publishYear:req.body.publishYear, 
  }
  const book= await Book.create(newBook);
  return res.status(201).send(book);
  } catch (error) {
    res.status(500).send({message:error.message})
  }
});

//Get one book from the database by id
router.get('/:id', async (req, res) => {
  try {
    const bookId=req.params.id;
    const book= await Book.findById(bookId);
    if(!book){
      return res.status(404).send(`No book with the id ${bookId}`)
    }
    return res.status(200).send(book);
  } catch (error) {
    return res.status(500).send({message:error.message});
  }
});

// Get all books from the database
router.get('/', async (req, res) => {
  try {
    const books= await Book.find({});
    return res.status(200).send(books);
  } catch (error) {
    return res.status(500).send({message:error.message});
  }
  
});

//Update a book in the database
router.put('/:id', async (req, res)=>{
  try {
    if(!req.body.title||!req.body.author||!req.body.publishYear){
      return res.status(400).send("Provide title, author, publishYear");
    }
    const bookId=req.params.id;
    const updatedBook= await Book.findByIdAndUpdate(bookId, req.body);
    if(!updatedBook){
      res.status(404).send(`You cant update a none existing book`);
    }
    res.status(201).send(updatedBook)
  } catch (error) {
    res.status(500).send({message:error.message})
  }
});

//Delete a book in from the database
router.delete('/:id',async (req, res)=>{
  try {
    const bookId=req.params.id;
    const deletedBook=await Book.findByIdAndDelete(bookId);
    if(!deletedBook){
      return res.status(404).send(`Book was not found`)
    }
    return res.status(200).send(`You have deleted this book ${deletedBook}`)
  } catch (error) {
    res.status(500).send({message:error.message})
  }
})

export default router;