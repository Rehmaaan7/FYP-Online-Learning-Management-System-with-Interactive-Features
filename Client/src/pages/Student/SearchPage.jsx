import React, { useState } from 'react'
import FilterCourses from './FilterCourses'
import SearchResult from './SearchResult'
import { useGetSearchedCoursesQuery } from '@/features/api/courseApi'
import { useSearchParams } from 'react-router-dom'

const SearchPage = () => {
    const [searchParams] = useSearchParams()
   
    const [selectedCategories,setSelectedCategories] = useState([])
    const [sort, setSort] = useState("")
     const query = searchParams.get("query")
     const {data, isLoading, isSuccess} = useGetSearchedCoursesQuery({
        searchQeury:query,
        categories:selectedCategories,
        sort
    })
    
    

    const FilterCoursesHandler = (checkedCategories, priceToSort)=>{
        setSelectedCategories(checkedCategories)
        setSort(priceToSort)
    }


    
   
    const Empty = !isLoading && data?.courses?.length === 0
  return (
  <div className="mt-20 px-4 sm:px-6 lg:px-10">
    <div className="mb-6">
      <p className="text-sm sm:text-base">
        Search results for{" "}
        <span className="font-bold text-blue-400 italic underline break-words">
          {query}
        </span>
      </p>
    </div>

    <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
      <FilterCourses FilterCoursesHandler={FilterCoursesHandler} />

      <div className="flex-1 space-y-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <CourseSkeleton key={index} />
          ))
        ) : Empty ? (
          <CourseNotFound />
        ) : (
          data?.courses?.map((course) => (
            <SearchResult
              key={course._id}
              course={course}
            />
          ))
        )}
      </div>
    </div>
  </div>
);
}

export default SearchPage

const CourseSkeleton = ()=>{
   return(
     <div>
        <h1>
            Loading...
        </h1>
    </div>
   )
}


const CourseNotFound = () => {
  return (
    <div className="flex justify-center items-center py-20">
      <h1 className="text-lg sm:text-xl font-semibold text-center">
        Course not found
      </h1>
    </div>
  );
};