import React from "react";
import Courses from "./Courses";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCoursesQuery } from "@/features/api/courseApi";
import { Link, NavLink, useParams } from "react-router-dom";

const CourseCart = () => {
  const { data, isLoading, error } = useGetCoursesQuery();
  if (isLoading) {
  }


  console.log("courses = ", data?.courses)

  return (
    <div className="px-4 md:px-8 py-10">
      {/* Heading */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Courses
      </h1>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm space-y-4"
              >
                {/* Image Skeleton */}
                <Skeleton className="h-40 w-full rounded-lg" />

                {/* Title */}
                <Skeleton className="h-4 w-[80%]" />

                {/* Subtitle */}
                <Skeleton className="h-4 w-[60%]" />

                {/* Button */}
                <Skeleton className="h-8 w-[40%] rounded-full" />
              </div>
            ))
          : data?.courses?.map((course) => (
              <Link to={`/courseinfo/${course._id}`} key={course._id}>
                <Courses course={course} />
              </Link>
            ))}
      </div>
    </div>
  );
};

export default CourseCart;
