import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useCreateCourseMutation } from '@/features/api/courseApi'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const AddCourse = () => {
    const navigate = useNavigate()

    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [createCourse,{ data, isLoading, isSuccess, error}] = useCreateCourseMutation()


const catchCategory = (categ)=>{
    setCategory(categ)
}


const createHandler = ()=>{
createCourse({title, category})
}

useEffect(()=>{
    if (isSuccess && data) {
        toast.success(data?.message|| "course created successfully")
        navigate("/instructor/course")
    }
    if(error){
        toast.error(error?.data?.message|| " system error failed to show, creation of course failed")
    }

},[isSuccess, error])


  return (
    <div className='flex-1 mx-10 mt-20'>
      <div className='mb-4'>
        <h1 className='font-bold text-xl'>
            add courses here
        </h1>
        <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo voluptates ullam dolorum sunt possimus rerum dolore ex? Necessitatibus cumque, quos, error illo, blanditiis cupiditate sapiente architecto recusandae provident vero consequatur.
        </p>
      </div>
      <div className='space-y-4'>
        <div >
            <Label> course </Label>
            <Input
            className=""
            value={title}
            onChange={(e)=> setTitle(e.target.value)}
            placeholder="enter your course "
            ></Input>
        </div>
        <div>
            <Label>category</Label>
            <Select onValueChange={catchCategory}>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="category" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectItem value="programming">programming</SelectItem>
      <SelectItem value="networking">networking</SelectItem>
      <SelectItem value="artificial intelligence">artificial intelligence</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
        </div>
        <div>
            <Button onClick={()=>navigate(-1)} variant='outline'>Back</Button>
            <Button onClick={createHandler}>
            {
                isLoading ? 
                (<>
                <Loader2 className='mr-2 h-4 w-4 animate-spin'/>please wait
                </>) :(" Save ")
            }
            </Button>
        </div>
      </div>
    </div>
  )
}

export default AddCourse
