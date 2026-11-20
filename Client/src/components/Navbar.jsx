import React, { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Menu, School } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import DarkMode from "./dark";
import { NavLink, useNavigate } from "react-router-dom";
import { useLogOutUserMutation } from "@/features/api/apiAuth";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [logOutUser, { data, isSuccess }] = useLogOutUserMutation();

  const logOutHandler = async () => {
   try {
    const res = await logOutUser().unwrap();
    if (res) {
      toast.success(res?.message || "Logged out successfully");
    }
    navigate("/login");
  } catch (error) {
    toast.error(error?.data?.message || "Logout failed");
  }
  };

  return (
    <div className="w-full fixed top-0 left-0 z-50 backdrop-blur-lg bg-white/70 dark:bg-zinc-900/70 border-b border-yellow-200/40 dark:border-zinc-700 shadow-md">
      <div className="hidden md:flex max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-20 py-3 items-center justify-between">
        <div className="hidden md:flex items-center gap-2 lg:gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-yellow-200/60 to-green-200/60 shadow-sm">
            <School className="w-6 h-6 text-green-700" />
          </div>

          <NavLink to={"/"}>
            <h1 className="text-xl font-bold tracking-wide bg-gradient-to-r from-green-700 via-yellow-600 to-green-600 bg-clip-text text-transparent">
              LMS
            </h1>
          </NavLink>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 md:gap-8">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-white/80 dark:bg-zinc-800 text-green-700 dark:text-green-400 border border-yellow-200 dark:border-zinc-700 hover:bg-green-50 dark:hover:bg-zinc-700 transition-all duration-300 rounded-xl px-2 sm:px-4 shadow-sm">
                  <Avatar>
                    <AvatarImage
                      src={user?.photoUrl || "https://github.com/shadcn.png"}
                      alt="@shadcn"
                      className="grayscale"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-44 sm:w-48 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-yellow-200 dark:border-zinc-700 shadow-xl rounded-xl">
                <DropdownMenuLabel className="text-green-800 dark:text-green-400">
                  My Account
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem className="cursor-pointer hover:bg-green-50 dark:hover:bg-zinc-800">
                    <NavLink to={"/profile"}>Edit Profile</NavLink>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="cursor-pointer hover:bg-yellow-50 dark:hover:bg-zinc-800">
                    <NavLink to={"/learning"}>My Learning</NavLink>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={logOutHandler}
                    className="cursor-pointer text-red-500 hover:bg-red-50 dark:hover:bg-zinc-800"
                  >
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                {user.role === "instructor" ? (
                  <>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem className="text-green-800 dark:text-green-400 cursor-pointer hover:bg-green-50 dark:hover:bg-zinc-800">
                      <NavLink to={"/instructor"}>Dashboard</NavLink>
                    </DropdownMenuItem>
                  </>
                ) : user?.role === "admin" ? (  <>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem className="text-green-800 dark:text-green-400 cursor-pointer hover:bg-green-50 dark:hover:bg-zinc-800">
                      <NavLink to={"/admin-panel/dashboard"}>Admin Dashboard</NavLink>
                    </DropdownMenuItem>
                  </>
          
                ):("")}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Button>
              <Button onClick={() => navigate("/login")}>
                Log In
              </Button>
            </div>
          )}

          <DarkMode />
        </div>
      </div>

      <div className="flex md:hidden items-center justify-between px-4 sm:px-6 h-14 w-full">
        <h1 className="text-xl font-bold tracking-wide bg-gradient-to-r from-green-700 via-yellow-600 to-green-600 bg-clip-text text-transparent">
          LMS
        </h1>

        <Mobile />
      </div>
    </div>
  );
};

export default Navbar;

const Mobile = () => {
  const role = "instructor";

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent className="flex flex-col w-[85%] sm:w-[400px]">
        <SheetHeader className="flex flex-row items-center justify-between pr-8">
          <SheetTitle>LMS</SheetTitle>
          <DarkMode />
        </SheetHeader>

        <div className="space-y-4 mt-8 px-2">
          <nav className="flex flex-col space-y-2">
            <span className="hover:cursor-pointer">
              <NavLink to={"/profile"}>Edit Profile</NavLink>
            </span>

            <span className="hover:cursor-pointer">
              <NavLink to={"/learning"}>My Learning</NavLink>
            </span>
          </nav>

          {role === "instructor" && (
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Dashboard</Button>
              </SheetClose>
            </SheetFooter>
          )}
          {role === "admin" && ( <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Admin panel</Button>
              </SheetClose>
            </SheetFooter>)}
        </div>
      </SheetContent>
    </Sheet>
  );
};






























// import React, { useEffect } from "react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "./ui/dropdown-menu";
// import {
//   Sheet,
//   SheetClose,
//   SheetContent,
//   SheetFooter,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet"
// import { Button } from "./ui/button";
// import { Menu, School } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// import  DarkMode  from "./dark";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useLogOutUserMutation } from "@/features/api/apiAuth";
// import { toast } from "sonner";
// import { useSelector } from "react-redux";








// const Navbar = () => {
//   const {user} = useSelector((state)=>state.auth) 
//   const navigate = useNavigate()
//   const [logOutUser, {data, isSuccess}] = useLogOutUserMutation();

//   const logOutHandler =  async()=>{
//     await logOutUser()
//     navigate("/login")
//   } 

//   useEffect (()=>{

//     if (isSuccess) {
//       toast.success(data.message|| "logged out")
//     }
//   },[isSuccess])



//   return (
//     <div className="w-full fixed top-0 left-0 z-50 backdrop-blur-lg bg-white/70 border-b border-yellow-200/40 shadow-md ">
//       <div className="max-w-7xl mx-auto md:px-20 md:py-3 py-3 px-6 flex items-center justify-between hidden md:flex">
//         {/* LEFT SIDE */}
//         <div className="flex items-center gap-3 hidden md:flex ">
//           <div className="p-2 rounded-xl bg-gradient-to-br from-yellow-200/60 to-green-200/60 shadow-sm">
//             <School className="w-6 h-6 text-green-700" />
//           </div>

//          <NavLink to={"/"}> <h1 className="text-xl font-bold tracking-wide bg-gradient-to-r from-green-700 via-yellow-600 to-green-600 bg-clip-text text-transparent">
//             LMS
//           </h1></NavLink>
//         </div>

//         {/* RIGHT SIDE */}
//         <div className="flex items-center md:gap-8 gap-2">
//           {user ? (
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button className="bg-white/80 text-green-700 border border-yellow-200 hover:bg-green-50 transition-all duration-300 rounded-xl px-4 shadow-sm">
//                   <Avatar>
//                     <AvatarImage
//                       src={user?.photoUrl || "https://github.com/shadcn.png"}
//                       alt="@shadcn"
//                       className="grayscale"
//                     />
//                     <AvatarFallback>CN</AvatarFallback>
//                   </Avatar>
//                 </Button>
//               </DropdownMenuTrigger>

//               <DropdownMenuContent className="w-44 bg-white/95 backdrop-blur-md border border-yellow-200 shadow-xl rounded-xl">
//                 <DropdownMenuLabel className="text-green-800">
//                   My Account
//                 </DropdownMenuLabel>

//                 <DropdownMenuSeparator />

//                 <DropdownMenuGroup>
//                   <DropdownMenuItem className="cursor-pointer hover:bg-green-50">
//                     <NavLink to={"/profile"}> Edit Profile</NavLink>
//                   </DropdownMenuItem>

//                   <DropdownMenuItem className="cursor-pointer hover:bg-yellow-50">
//                     <NavLink to={"/learning"}> My Learning </NavLink>
//                   </DropdownMenuItem>

//                   <DropdownMenuItem onClick={logOutHandler}
//                   className="cursor-pointer text-red-500 hover:bg-red-50 ">
//                     Log Out
//                   </DropdownMenuItem>
//                 </DropdownMenuGroup>

//                {
//                 user.role === "instructor" ? <> <DropdownMenuSeparator />

//                 <DropdownMenuItem className="text-green-800 cursor-pointer hover:bg-green-50">
//                  <NavLink to={"/admin"}> Dashboard </NavLink>
//                 </DropdownMenuItem></> :""
//                }
//               </DropdownMenuContent>
//             </DropdownMenu>
//           ) : (
//             <div className="flex items-center gap-2">
//               <Button variant="outline" onClick={()=>navigate("/signup")}>Sign Up</Button>
//               <Button onClick={()=>navigate("/login")}>Log In</Button>
//             </div>
//           )}
//           <DarkMode />
//         </div>
//       </div>
//       <div className="flex md:hidden items-center justify-between px-4 h-14">
        
//           <h1 className="text-xl font-bold tracking-wide bg-gradient-to-r from-green-700 via-yellow-600 to-green-600 bg-clip-text text-transparent">
//             LMS
//           </h1>
          
//         <Mobile />
       
        
          

//       </div>
//     </div>
//   );
// };

// export default Navbar;

// // Now for mobile use

// const Mobile = ()=>{
//   const role = "instructor"
//     return(
//          <Sheet>
//       <SheetTrigger asChild>
//         <Button variant="outline" size="icon"> 
//             <Menu/>
//         </Button>
//       </SheetTrigger>
//       <SheetContent className={"flex flex-col"}>
//         <SheetHeader className={"flex flex-row items-center justify-between mr-15"}>
//           <SheetTitle>LMS</SheetTitle>
//           <DarkMode />
//         </SheetHeader>
//         <div className="space-y-4 mt-10 ml-5">
//           <nav className="flex flex-col space-y-2">
//             <span className="hover:cursor-pointer"><NavLink to={"/profile"}> Edit Profile</NavLink></span>
//             <span className="hover:cursor-pointer"><NavLink to={"/learning"}> My Learning </NavLink></span>
//           </nav>
//           {
//             role === "instructor" && (
//                <SheetFooter>
        
//           <SheetClose asChild>
//               <Button type="submit">Dashboard</Button>
//           </SheetClose>
//         </SheetFooter>
//             )
//           }

//         </div>
       
//       </SheetContent>
//     </Sheet>
//     )
// }
