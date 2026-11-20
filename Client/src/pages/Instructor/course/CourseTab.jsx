import React from 'react'
import { NavLink } from 'react-router-dom'
import CourseEdit from './CourseEdit'

const CourseTab = () => {
  return (
    <div className='mt-20'>
     <div className='flex justify-between'>
        <h1 className='font-bold'>edit your course contents</h1>
        <NavLink className={"hover:text-blue-600 underline"} to={"lectures"}> go to lectures</NavLink>
        <NavLink className={"hover:text-blue-600 underline"} to={"assignments"}> go to assignments</NavLink>
        <NavLink className={"hover:text-blue-600 underline"} to={"quizzes"}> go to quizzes</NavLink>
        <NavLink className={"hover:text-blue-600 underline"} to={"forum"}> go to forum</NavLink>
        <NavLink className={"hover:text-blue-600 underline"} to={"announcements"}> go to announcements</NavLink>
        
     </div>
     <div>
        <CourseEdit />
     </div>
    </div>
  )
}

export default CourseTab
