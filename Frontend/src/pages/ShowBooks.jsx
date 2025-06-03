import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import { Link, useParams } from "react-router-dom";

export default function ShowBooks() {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white p-6 md:p-10">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      ) : (
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <BackButton />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-amber-800 mb-8 border-b-2 border-amber-200 pb-2">
            Book Details
          </h1>
          
          <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-amber-200">
            <div className="bg-amber-100 px-6 py-4 border-b border-amber-200">
              <h2 className="text-xl font-semibold text-amber-900">{book.title}</h2>
              <p className="text-amber-700 italic">by {book.author}</p>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center py-2 border-b border-gray-100">
                <span className="text-gray-600 font-medium w-36">Book ID</span>
                <span className="font-mono bg-gray-50 px-3 py-1 rounded text-gray-800">{book._id}</span>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center py-2 border-b border-gray-100">
                <span className="text-gray-600 font-medium w-36">Title</span>
                <span className="text-gray-800 font-medium">{book.title}</span>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center py-2 border-b border-gray-100">
                <span className="text-gray-600 font-medium w-36">Author</span>
                <span className="text-gray-800">{book.author}</span>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center py-2">
                <span className="text-gray-600 font-medium w-36">Published</span>
                <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">{book.publishYear}</span>
              </div>
            </div>
            
            <div className="bg-gray-50 px-6 py-4 flex justify-end gap-4 border-t border-gray-100">
              <Link 
                to={`/books/edit/${book._id}`}
                className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors duration-300"
              >
                Edit Book
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
