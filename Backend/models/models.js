import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title:String,
  author:String,
  publishYear:Number,
},{timestamps:true});

export const Book = mongoose.model('Book', bookSchema);

