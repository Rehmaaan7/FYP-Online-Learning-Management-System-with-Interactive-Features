import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSignUpUserMutation } from "../features/api/apiAuth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const SignUp = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate()

  const [signUpUser, {data, error, isLoading, isSuccess}]= useSignUpUserMutation();

  const onSubmit = (formData) => {
    signUpUser(formData);
    
  };
  useEffect(()=>{
    if (isSuccess && data) {
      toast.success(data?.message|| "sign up successfull")
      navigate("/login")
      
    }
    if (error) {
      toast.error(error?.data?.message || "Some error occurred in signing up");
    }

  },[data, error, isSuccess])
  return (
    <>
      <div>
        <h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div
              className="min-h-screen flex items-center justify-center 
                  bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 px-4 mt-8"
            >
              <div
                className="w-full max-w-md md:max-w-lg lg:max-w-xl 
                    backdrop-blur-xl bg-white/20 border border-white/30 
                    shadow-2xl rounded-2xl p-6 md:p-8 
                    transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)]"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6 tracking-wide">
                  Welcome
                </h2>

                <div className="space-y-5">
                    <div>
                    <label className="text-gray-700 text-sm mb-1 block">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your Name"
                      {...register("name")}
                      className="w-full px-4 py-2 rounded-lg 
                       bg-white/70 text-gray-800 placeholder-gray-500 
                       outline-none border border-gray-200 
                       focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 
                       transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="text-gray-700 text-sm mb-1 block">
                      Email
                    </label>
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
                    <label className="text-gray-700 text-sm mb-1 block">
                      Password
                    </label>
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
                      <input type="checkbox" className="checkbox checkbox-sm" />
                      Remember me
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 rounded-lg 
                           bg-gradient-to-r from-indigo-500 to-purple-500 
                           text-white font-semibold 
                           hover:opacity-90 active:scale-95 
                           transition-all duration-300 shadow-md"
                  >
                    {
            isLoading ? 
            <> 
            <Loader2 className="mr-4 animate-spin" /> please wait  
            </> 
            : "Sign Up"
          } 
                  </button>

                  <p className="text-center text-sm text-gray-700 mt-4">
                    have an account?{" "}
                    <span className="cursor-pointer hover:underline hover:text-indigo-500 transition"
                    onClick={()=>navigate("/login")}>
                      Log in
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </form>
        </h1>
      </div>
    </>
  );
};

export default SignUp;
