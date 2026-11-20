// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useGetUserPurchasedCoursesQuery } from "@/features/api/purchaseApi";
// import React from "react";
// import {
//   CartesianGrid,
//   Line,
//   LineChart,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";

// const Dashboard = () => {
//   const { data, isSuccess, isLoading, isError } =
//     useGetUserPurchasedCoursesQuery();

//   if (isError) {
//     return console.log(isError);
//   }

//   const purchasedCourse = data?.getPurchasedCourses || [];
//   const courseData = purchasedCourse?.map((course) => ({
//     name: course?.courseId?.title,
//     price: course?.courseId?.price,
//   }));

//   const revenue = purchasedCourse?.reduce(
//     (acc, element) => acc + (element.amount || 0),
//     0,
//   );
//   const sales = purchasedCourse?.length;
//   console.log("purchasedCourse = ", purchasedCourse);
//   return (
//     <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-30">
//       <Card>
//         <CardHeader>
//           <CardTitle>TOTAL</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p className="tex-3xl font-bold text-blue-600">{sales}</p>
//         </CardContent>
//       </Card>
//       <Card>
//         <CardHeader>
//           <CardTitle>TOTAL REVENUE</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p className="tex-3xl font-bold text-blue-600">{revenue}</p>
//         </CardContent>
//       </Card>
//       <Card>
//         <CardHeader>
//           <CardTitle>course prices</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ResponsiveContainer width={"100%"} height={250}>
//             <LineChart data={courseData}>
//               <CartesianGrid strokeDasharray={"3 3"} stroke="blue" />

//               <XAxis
//                 dataKey="name"
//                 stroke="green"
//                 angle={-30}
//                 textAnchor="end"
//                 interval={0}
//               />
//               <YAxis stroke="#6b7280" />
//               <Tooltip formatter={(value, name) => [`PKR ${value}`, name]} />
//               <Line type="monotone" dataKey="price" stroke="#8884d8" />
//             </LineChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Dashboard;

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetUserPurchasedCoursesQuery } from "@/features/api/purchaseApi";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Dashboard = () => {
  const { data, isLoading, isError } = useGetUserPurchasedCoursesQuery();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>Something went wrong!</h1>;
  }

  // API response contains getPurchasedCourses
  const purchasedCourses = data?.getPurchasedCourses || [];

  const courseData = purchasedCourses.map((course) => ({
    name: course.courseId?.title,
    price: course.courseId?.price,
  }));

  const revenue = purchasedCourses.reduce(
    (acc, course) => acc + (course.amount || 0),
    0
  );

  const sales = purchasedCourses?.length;

  return (
    <div className="space-y-6 mt-18">

  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    <Card>
      <CardHeader>
        <CardTitle>Total Sales</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold text-blue-600">
          {sales}
        </p>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Total Revenue</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold text-green-600">
          PKR {revenue}
        </p>
      </CardContent>
    </Card>

  </div>

  
  <Card>
    <CardHeader>
      <CardTitle>Course Prices</CardTitle>
    </CardHeader>

    <CardContent>
      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={courseData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="name"
              angle={-15}
              textAnchor="end"
              interval={0}
              height={70}
            />

            <YAxis />

            <Tooltip
              formatter={(value) => [
                `PKR ${value}`,
                "Price",
              ]}
            />

            <Line
              type="monotone"
              dataKey="price"
              stroke="#2563eb"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>

</div>
  );
};

export default Dashboard;













// import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
// import React from "react";
// import { NavLink } from "react-router-dom";

// const SideBar = () => {
//   const navItem =
//     "flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200";

//   const active =
//     "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md";

//   return (
//     <aside className="hidden lg:flex flex-col w-[260px] border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">

//       {/* Inner container (controls spacing below navbar) */}
//       <div className="flex flex-col h-[calc(100vh-64px)] mt-16 p-6">

//         {/* Logo / Title */}
//         <div className="mb-10">
//           <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
//             LMS Panel
//           </h1>
//           <p className="text-sm text-gray-500">
//             Manage your learning
//           </p>
//         </div>

//         {/* Navigation */}
//         <nav className="flex flex-col gap-3 flex-1">
//           <NavLink
//             to="/dashboard"
//             className={({ isActive }) =>
//               `${navItem} ${isActive ? active : ""}`
//             }
//           >
//             <ChartNoAxesColumn size={20} />
//             <span className="font-medium">Dashboard</span>
//           </NavLink>

//           <NavLink
//             to="/course"
//             className={({ isActive }) =>
//               `${navItem} ${isActive ? active : ""}`
//             }
//           >
//             <SquareLibrary size={20} />
//             <span className="font-medium">Courses</span>
//           </NavLink>
//         </nav>

//         {/* Bottom Section */}
//         <div className="pt-6 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-400">
//           © 2026 LMS
//         </div>

//       </div>
//     </aside>
//   );
// };

// export default SideBar;
