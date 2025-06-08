import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


export default function EditBooks() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(()=>{
    setLoading(true);
    axios.get(`http://localhost:5555/books/${id}`)
    .then((response)=>{
      const book = response.data;
      setTitle(book.title);
      setAuthor(book.author);
      setPublishYear(book.publishYear);
      setLoading(false);
    })
    .catch((err)=>{
      setError("Failed to fetch book data", err);
      setLoading(false);
    })
  },[id])


  const handleSaveBook = () => {
    // Reset any previous errors
    setError("");

    // Validate inputs
    if (!title.trim()) {
      setError("Book title is required");
      return;
    }

    if (!author.trim()) {
      setError("Author name is required");
      return;
    }

    if (!publishYear.trim()) {
      setError("Publish year is required");
      return;
    }

    // Check if publish year is a valid number
    if (isNaN(publishYear) || publishYear.length !== 4) {
      setError("Publish year must be a valid 4-digit year");
      return;
    }

    const data = {
      title,
      author,
      publishYear,
    };
    
    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          // Server responded with an error
          setError(
            `Server error: ${
              error.response.data.message || "Failed to edit book"
            }`
          );
        } else if (error.request) {
          // Request was made but no response received
          setError(
            "Network error: Server is not responding. Please check your connection."
          );
        } else {
          // Something happened in setting up the request
          setError(`Error: ${error.message || "An unknown error occurred"}`);
        }
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white py-12 px-4 sm:px-6 md:px-8">
      {loading ? (
        <div className="flex justify-center items-center h-[70vh]">
          <Spinner />
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <BackButton />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-amber-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-amber-100 bg-amber-50">
              <h1 className="text-2xl font-bold text-amber-900">
                Add New Book
              </h1>
              <p className="text-amber-700 text-sm mt-1">
                Enter the details of your new book below
              </p>
            </div>

            {error && (
              <div className="mx-6 mt-6 px-4 py-3 bg-red-50 border-l-4 border-red-500 rounded-md">
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 text-red-500 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-red-700 font-medium">{error}</p>
                </div>
              </div>
            )}

            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="title-text"
                  className="block text-sm font-medium text-gray-700"
                >
                  Book Title
                </label>
                <input
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-200"
                  type="text"
                  id="title-text"
                  placeholder="Enter book title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="author-text"
                  className="block text-sm font-medium text-gray-700"
                >
                  Author Name
                </label>
                <input
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-200"
                  type="text"
                  id="author-text"
                  placeholder="Enter author name"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="publishYear-text"
                  className="block text-sm font-medium text-gray-700"
                >
                  Publish Year
                </label>
                <input
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-200"
                  type="text"
                  id="publishYear-text"
                  placeholder="Enter publish year (e.g., 2024)"
                  value={publishYear}
                  onChange={(e) => setPublishYear(e.target.value)}
                />
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 flex justify-end">
              <button
                className="px-6 py-2.5 bg-amber-500 text-white font-medium rounded-lg shadow-sm hover:bg-amber-600 active:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-all duration-300"
                onClick={handleSaveBook}
              >
                Apply Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
