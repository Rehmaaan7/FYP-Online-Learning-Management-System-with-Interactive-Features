import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] =useState("")

  const searchHandler = (e)=>{
    e.preventDefault()
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`)
    }
    setSearchQuery("")
  }
  return (
    <div className="mt-16 py-12 px-4 flex justify-center">
      <div className="w-full max-w-4xl text-center space-y-6">
        
        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          Explore Courses & Upgrade Your Skills
        </h1>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
          Learn in-demand skills, grow your knowledge, and connect with expert instructors.
        </p>

        
        <form onSubmit={searchHandler} className="flex items-center max-w-xl mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-sm overflow-hidden">
          <input
            type="text"
            value={searchQuery}
            onChange={(e)=>setSearchQuery(e.target.value)}
            placeholder="Search courses..."
            className="flex-1 px-4 py-2 outline-none bg-transparent text-gray-800 dark:text-white"
          />
          <button type="submit" className="px-5 py-2 bg-blue-600 text-white hover:bg-blue-700 transition">
            Search
          </button>
        </form>

        
        <button onClick={()=>navigate(`/course/search?query=${""}`)} className="px-6 py-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition">
          Explore Courses
        </button>

      </div>
    </div>
  );
};

export default HeroSection;