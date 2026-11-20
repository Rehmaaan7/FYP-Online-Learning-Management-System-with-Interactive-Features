import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import Courses from "./Courses";
import { useGetUserQuery, useUpdateUserMutation } from "@/features/api/apiAuth";
import { toast } from "sonner";

const EditProfile = () => {
  const { data, isLoading, isSuccess, refetch } = useGetUserQuery();
  console.log("this is data recieved from beckend by getUser : ", data);

  const [imgLoading, setImgLoading] = React.useState(true);

  const [updateUser, {data:updateData, isLoading:updateIslLoading, isSuccess:updateIsSuccess, error}] = useUpdateUserMutation()
  console.log("updated user : ", updateData)

  const [name, setName] = useState("")
  const [profilePhoto, setProfilePhoto] = useState("")

  const profilePhotoHandler = (e)=>{
    const file = e.target.files?.[0]
    if (file) 
      setProfilePhoto(file)
  }

  const saveChangesHandler = async()=>{
    const formData = new FormData()
    formData.append("name", name)
    formData.append("profilePhoto", profilePhoto)
    await updateUser(formData)

  }
  useEffect(()=>{
    if (updateIsSuccess) {
      refetch()
      toast.success(updateData?.message || "user updated") 
    }
    if (error) {
     toast.error(error?.data?.message || "updating user failed")
    }

  },[updateData, updateIslLoading, error,updateIsSuccess])

 const user = data?.user || {};
  return (
    <div className="py-16 px-4 md:px-10 max-w-7xl mx-auto">
      {/* Heading */}
      <h1 className="text-3xl font-bold mb-10 bg-gradient-to-r from-green-600 via-amber-400 to-green-500 bg-clip-text text-transparent">
        Profile
      </h1>

      {/* ================= PROFILE (FULL WIDTH) ================= */}
      {isLoading ? (
        <div className="p-6 rounded-2xl backdrop-blur-md bg-white/50 dark:bg-gray-800/40 border border-white/20 shadow-md space-y-5">
          <div className="flex items-center gap-4">
            <Skeleton className="h-20 w-20 rounded-full" />
            <div className="space-y-3 w-full">
              <Skeleton className="h-4 w-[40%]" />
              <Skeleton className="h-4 w-[60%]" />
              <Skeleton className="h-4 w-[30%]" />
            </div>
          </div>

          <Skeleton className="h-10 w-[150px] rounded-full" />
        </div>
      ) : (
        <div className="p-6 md:p-8 rounded-2xl backdrop-blur-md bg-white/50 dark:bg-gray-800/40 border border-white/20 shadow-md transition-all duration-300 hover:shadow-lg">
          {/* Avatar + Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Avatar with Skeleton */}
            <div className="relative h-20 w-20">
              {imgLoading && (
                <Skeleton className="absolute inset-0 rounded-full" />
              )}

              <Avatar className="h-24 w-24 md:h-32 md:w-32 ring-2 ring-green-400/20">
                <AvatarImage
                  src={user?.photoUrl || "https://github.com/shadcn.png"}
                  onLoad={() => setImgLoading(false)}
                  className={imgLoading ? "opacity-0" : "opacity-100"}
                />
                <AvatarFallback>MR</AvatarFallback>
              </Avatar>
            </div>

            {/* Info */}
            <div className="space-y-3 leading-relaxed mx-6 md:mx-14">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                <span className="font-medium text-gray-500">Name:</span>{" "}
                {user?.name}
              </h2>

              <p className="text-sm text-gray-500 break-words">
                <span className="font-medium text-gray-400">Email:</span>{" "}
                {user?.email}
              </p>

              <p className="text-sm text-gray-500 flex items-center gap-2 flex-wrap">
                <span className="text-xs px-2 py-1 rounded-md bg-green-100/70 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                  Role
                </span>
                {user?.role?.toUpperCase()}
              </p>
            </div>
          </div>

          {/* Button */}
          <div className="mt-6 md:mt-16">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="rounded-full px-6 bg-gradient-to-r from-green-500 to-amber-400 text-white shadow-sm hover:opacity-90">
                  Edit Profile
                </Button>
              </DialogTrigger>

              <DialogContent className="rounded-2xl backdrop-blur-md bg-white/60 dark:bg-gray-900/60 border border-white/20 shadow-xl">
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                  <DialogDescription>
                    Make changes and save your profile
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input
                      type="text"
                      placeholder="Enter your name"
                      className="bg-white/60 dark:bg-gray-800/50 border-white/20"
                      value={name}
                      onChange={(e)=>setName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Profile Photo</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      className="bg-white/60 dark:bg-gray-800/50 border-white/20"
                      onChange={profilePhotoHandler}
                    />
                  </div>
                </div>

                <DialogFooter className="mt-6">
                  <Button
                    disabled={isLoading}
                    className="w-full rounded-full bg-gradient-to-r from-green-500 to-amber-400 text-white"
                    onClick={saveChangesHandler}
                  >
                    {isLoading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}

      {/* ================= COURSES BELOW ================= */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
          Enrolled Courses
        </h2>

        {user?.enrolledcourses?.length === 0 ? (
          <div className="p-10 text-center rounded-2xl backdrop-blur-md bg-white/50 dark:bg-gray-800/40 border border-white/20 shadow-md">
            <p className="text-gray-500">
              You are not enrolled in any course yet
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {user?.enrolledcourses?.map((course) => (
              <div
                key={user._id}
                className="rounded-2xl backdrop-blur-md bg-white/50 dark:bg-gray-800/40 border border-white/20 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
              >
                <Courses course={course} key={course._id}/>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
