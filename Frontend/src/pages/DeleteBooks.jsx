import React, {useState, useEffect} from "react"
import axios from "axios";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import { useParams, useNavigate } from "react-router-dom";

export default function DeleteBooks(){
 const [loading, isLoading] = useState(false);
 const [error, setError] = useState('');
 const {id} = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
  isLoading(true);
  axios.delete(`http://localhost:5555/books/${id}`)
  .then(() => {
   isLoading(false);
   // Wait 2 seconds before redirecting to home page
   setTimeout(() => {
    navigate('/');
   }, 2000);
  })
  .catch((error) => {
   isLoading(false);
   setError(error.message);
   console.log(error.message);
  })
 }, [id, navigate])

 return (
  <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white py-12 px-4 sm:px-6 md:px-8">
   {loading ? (
    <div className="flex justify-center items-center h-[70vh]">
     <Spinner />
    </div>
   ) : (
    <div className="max-w-lg mx-auto">
     <div className="mb-8">
      <BackButton />
     </div>
     
     <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
      {error ? (
       <div className="px-6 py-5 border-b border-red-100 bg-red-50">
        <h1 className="text-2xl font-bold text-red-900">Error Deleting Book</h1>
        <div className="mt-4 px-4 py-3 bg-red-50 border-l-4 border-red-500 rounded-md">
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
          <p className="text-red-700 font-medium">Error: {error}</p>
         </div>
        </div>
       </div>
      ) : (
       <>
        <div className="px-6 py-5 border-b border-green-100 bg-green-50">
         <h1 className="text-2xl font-bold text-green-900">Book Deleted</h1>
         <p className="text-green-700 text-sm mt-1">
          The book has been successfully removed from the database
         </p>
        </div>
        
        <div className="p-6">
         <div className="flex items-center justify-center p-6 bg-gray-50 rounded-lg border border-gray-100">
          <svg 
           className="w-12 h-12 text-green-500 mr-3" 
           fill="none" 
           stroke="currentColor" 
           viewBox="0 0 24 24" 
           xmlns="http://www.w3.org/2000/svg"
          >
           <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M5 13l4 4L19 7"
           ></path>
          </svg>
          <p className="text-lg text-gray-700">
           Book with ID <span className="font-medium">{id}</span> has been successfully deleted
          </p>
         </div>
         <p className="text-center text-gray-500 text-sm mt-4">
          Redirecting to home page...
         </p>
        </div>
       </>
      )}
     </div>
    </div>
   )}
  </div>
 );
}