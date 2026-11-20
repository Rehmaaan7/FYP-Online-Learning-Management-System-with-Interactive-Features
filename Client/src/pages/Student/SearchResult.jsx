
import { Badge } from '@/components/ui/badge'
import React from 'react'
import { Link } from 'react-router-dom'

const SearchResult = ({course}) => {
    
  return (
    <div className="w-full">
  <Link
    to={`/courseinfo/${course._id}`}
    className="block w-full"
  >
    <div className="flex flex-col md:flex-row gap-4 border-b border-gray-300 dark:border-zinc-700 py-4 hover:bg-gray-50 dark:hover:bg-zinc-900 transition-all rounded-lg">
      <img
        src={course?.thumbnail}
        alt=""
        className="h-40 sm:h-36 md:h-32 w-full md:w-56 object-cover rounded"
      />

      <div className="flex flex-col gap-2 md:ml-4 lg:ml-8 flex-1">
        <h1 className="font-semibold text-base sm:text-lg">
          {course?.title}
        </h1>

        <p className="text-sm text-gray-600 dark:text-gray-400">
          {course?.subTitle}
        </p>

        <p className="text-sm">
          Instructor: {course?.creator?.name}
        </p>

        <Badge className="w-fit mt-1">
          {course?.level}
        </Badge>
      </div>
    </div>
  </Link>
</div>
  //  <div>
    
  //     <Link to={`/courseinfo/${course._id}`}
  //     className='flex flex-col md:flex-row gap-4 w-full md:w-auto'>
  //        <div className='flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-300 py-4'>
  //       <img src={course?.thumbnail} alt="" className='h-32 w-full md:w-56 object-cover rounded'/>

     
  //     <div className='flex flex-col gap-2 ml-10'>
  //       <h1>{course?.title}</h1>
  //       <p>{course?.subTitle} </p>
  //       <p>instructor: {course?.creator?.name} </p>
  //       <Badge className='w-fit mt-2 md:mt-0' > {course?.level}</Badge>



  //     </div>
       
  //   </div>
  //    </Link>
   
  //  </div>
  )
}

export default SearchResult
