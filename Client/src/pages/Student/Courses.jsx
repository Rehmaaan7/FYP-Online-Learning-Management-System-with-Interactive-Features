import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useGetCoursesQuery } from "@/features/api/courseApi";
import React from "react";

const Courses = ({course}) => {
  
  
  return (
    <Card className="overflow-hidden rounded-2xl bg-white dark:bg-gray-900 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-gray-800">
      
      {/* Image */}
      <div className="relative">
        <img
          src={course?.thumbnail || "https://images.pexels.com/photos/7715724/pexels-photo-7715724.jpeg"}
          // 
          alt="course"
          className="w-full h-40 object-cover"
        />

        {/* Badge on image */}
        <Badge className="absolute top-3 right-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-full shadow">
          {course?.level}
        </Badge>
      </div>

      {/* Content */}
      <CardContent className="p-4 space-y-4">
        
        {/* Title */}
        <h1 className="font-semibold text-lg text-gray-900 dark:text-white line-clamp-2">
        {course?.title}
        </h1>

        {/* Instructor */}
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={course.creator?.photoUrl ||  "https://github.com/shadcn.png"}
             
              alt="instructor"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {course?.creator?.name}
          </p>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-blue-600 font-bold text-lg">
            Rs {course.price}
          </span>

          <button className="text-sm px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition">
            Enroll
          </button>
        </div>

      </CardContent>
    </Card>
  );
};

export default Courses;