import React from 'react'
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { useEffect } from 'react';
import { useLogInUserMutation } from '@/features/api/apiAuth.js';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    
    const {register, handleSubmit} = useForm()
    const navigate = useNavigate()

    // const [logInUser, {data, error, isLoading, isSuccess}] = uselogInUserMutation()
    const [logInUser, {data, error, isLoading, isSuccess}] = useLogInUserMutation()

    const onsubmit = (data)=>{
        
        logInUser(data)
    }
    useEffect(()=>{
      if(isSuccess && data){
        toast.success(data.message || `wellcome back ${data.name}`)
        navigate("/")

      }
      if (error) {
        toast.error(error?.data?.message || "Some error occurred in login");
        console.log(error)
      }

    },[data,error, isSuccess])

  return (
 <>
 <form onSubmit={handleSubmit(onsubmit)}>
    
  <div className="min-h-screen flex items-center justify-center 
                  bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 px-4">
    
    <div className="w-full max-w-md md:max-w-lg lg:max-w-xl 
                    backdrop-blur-xl bg-white/20 border border-white/30 
                    shadow-2xl rounded-2xl p-6 md:p-8 
                    transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)]"
                    >
      
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6 tracking-wide">
        Welcome Back
      </h2>

      <div className="space-y-5">
        
        <div>
          <label className="text-gray-700 text-sm mb-1 block">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            className="w-full px-4 py-2 rounded-lg 
                       bg-white/70 text-gray-800 placeholder-gray-500 
                       outline-none border border-gray-200 
                       focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 
                       transition-all duration-300"
          />
        </div>

        <div>
          <label className="text-gray-700 text-sm mb-1 block">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            {...register("password")}
            className="w-full px-4 py-2 rounded-lg 
                       bg-white/70 text-gray-800 placeholder-gray-500 
                       outline-none border border-gray-200 
                       focus:border-purple-400 focus:ring-2 focus:ring-purple-200 
                       transition-all duration-300"
          />
        </div>

        <div className="flex justify-between items-center text-sm text-gray-700">
          <label className="flex items-center gap-2 cursor-pointer">
            {/* <input type="checkbox" className="checkbox checkbox-sm" /> */}
          {/* {  Remember me} */}
          </label>

          <span className="cursor-pointer hover:underline hover:text-indigo-500 transition">
        {/* {    Forgot password?} */}
          </span>
        </div>

        <button type='submit'
        disabled={isLoading}
        className="w-full py-2 rounded-lg 
                           bg-gradient-to-r from-indigo-500 to-purple-500 
                           text-white font-semibold 
                           hover:opacity-90 active:scale-95 
                           transition-all duration-300 shadow-md">
          {
            isLoading ? 
            <> 
            <Loader2 className="mr-4 animate-spin" /> please wait  
            </> 
            : "login"
          } 
        </button>

        <p className="text-center text-sm text-gray-700 mt-4">
          Don’t have an account?{" "}
          <span className="cursor-pointer hover:underline hover:text-indigo-500 transition"
          onClick={()=>navigate("/signup")}>
            Sign up
          </span>
        </p>

      </div>
    </div>

  </div>

 </form>
 </>
  )
}

export default Login
