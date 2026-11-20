import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import Courses from "./Courses";

const Learning = () => {
  const isLoading = false;
  const learningCourses = []; 

  return (
    <div className="py-20 px-6">
      
      
      <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-green-700 via-amber-500 to-green-600 bg-clip-text text-transparent">
        My Learning
      </h1>

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        
        {isLoading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="p-4 rounded-2xl backdrop-blur-lg bg-white/60 dark:bg-gray-800/50 border border-white/30 shadow-lg space-y-4"
            >
              <Skeleton className="h-40 w-full rounded-xl" />
              <Skeleton className="h-4 w-[80%]" />
              <Skeleton className="h-4 w-[60%]" />
              <Skeleton className="h-8 w-[40%] rounded-full" />
            </div>
          ))
        ) : learningCourses.length === 0 ? (
          
         
          <div className="col-span-full flex flex-col items-center justify-center py-20 rounded-2xl backdrop-blur-lg bg-white/60 dark:bg-gray-800/50 border border-white/30 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
              No courses yet
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              You are not enrolled in any course
            </p>
          </div>

        ) : (
          
          
          learningCourses.map((_, index) => (
            <div
              key={index}
              className="rounded-2xl backdrop-blur-lg bg-white/60 dark:bg-gray-800/50 border border-white/30 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
            >
              <Courses />
            </div>
          ))

        )}
      </div>
    </div>
  );
};

export default Learning;