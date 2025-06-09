import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

export default function HomeBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiUrl}/books`)
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white py-12 px-4 sm:px-6 md:px-8">
      {loading ? (
        <div className="flex justify-center items-center h-[70vh]">
          <Spinner />
        </div>
      ) : (
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-amber-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-amber-100 bg-amber-50 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-amber-900">Book List</h1>
                <p className="text-amber-700 text-sm mt-1">
                  Browse and manage your book collection
                </p>
              </div>
              <Link to="/books/create">
                <button className="flex items-center gap-1 px-4 py-2 bg-amber-500 text-white font-medium rounded-lg shadow-sm hover:bg-amber-600 active:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-all duration-300">
                  <MdOutlineAddBox className="text-xl" />
                  <span>Add Book</span>
                </button>
              </Link>
            </div>

            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                      <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-md:hidden">Author</th>
                      <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-md:hidden">Publish Year</th>
                      <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Operations</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {books.map((book, index) => (
                      <tr key={book._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {book.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 max-md:hidden">
                          {book.author}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 max-md:hidden">
                          {book.publishYear}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex gap-x-4">
                            <Link to={`/books/details/${book._id}`}>
                              <BsInfoCircle className="text-lg text-blue-500 hover:text-blue-700" />
                            </Link>
                            <Link to={`/books/edit/${book._id}`}>
                              <AiOutlineEdit className="text-lg text-yellow-500 hover:text-yellow-700" />
                            </Link>
                            <Link to={`/books/delete/${book._id}`}>
                              <MdOutlineDelete className="text-lg text-red-500 hover:text-red-700" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
