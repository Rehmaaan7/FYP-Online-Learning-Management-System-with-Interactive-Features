import { Edit } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'

const Lectures = ({lecture, index }) => {
  return (
    <div className='flex justify-between bg-gray-100'>
     <h1> lecture - {index+1} {lecture.title} </h1>
     <NavLink to={lecture._id}>
      <Edit 
     
     />
     </NavLink>
     
    </div>
  )
}

export default Lectures
