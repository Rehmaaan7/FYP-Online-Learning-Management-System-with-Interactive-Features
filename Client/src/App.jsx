import React from "react";
import Login from "./pages/LogIn";
import SignUp from "./pages/Sign-Up";
import HeroSection from "./pages/Student/Hero.section";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./rootLayout/Root.Layout";
import CourseCart from "./pages/Student/Course.Cart";
import Learning from "./pages/Student/Learning";
import EditProfile from "./pages/Student/Edit.Profile";
import Dashboard from "./pages/Instructor/Dashboard";
import AdminLayout from "./pages/Instructor/AdminLayout";
import TableOfCourses from "./pages/Instructor/course/TableOfCourses";
import AddCourse from "./pages/Instructor/course/AddCourse";
import CourseTab from "./pages/Instructor/course/CourseTab";
import CreateLecture from "./pages/Instructor/lecture/CreateLecture";
import EditLecture from "./pages/Instructor/lecture/EditLecture";
import CourseInfo from "./pages/Student/CourseInfo";
import CourseProgress from "./pages/Student/CourseProgress";
import SearchPage from "./pages/Student/SearchPage";
import Forum from "./pages/Student/Forum";
import Assignments from "./pages/Student/Assignments";
import Quizzes from "./pages/Student/Quizzes";
import QuizAttempt from "./pages/Student/QuizAttempt";
import Announcements from "./pages/Student/Announcements";
import ManageAssignments from "./pages/Instructor/assignment/ManageAssignments";
import Submissions from "./pages/Instructor/assignment/Submissions";
import ManageQuizzes from "./pages/Instructor/quiz/ManageQuizzes";
import ManageForum from "./pages/Instructor/forum/ManageForum";
import ManageAnnouncements from "./pages/Instructor/announcement/ManageAnnouncements";
import {
  AdminRoute,
  AuthenticatedUser,
  InstructorRoute,
  ProtectedRoute,
} from "./components/ProtectedRoutes";
import AdminPanelLayout from "./pages/AdminPanel/AdminPanelLayout";
import AdminDashboard from "./pages/AdminPanel/AdminDashboard";
import UserManagement from "./pages/AdminPanel/UserManagement";
import CourseOversight from "./pages/AdminPanel/CourseOversight";
import SystemAnnouncements from "./pages/AdminPanel/SystemAnnouncements";
import PurchaseProtectedRoute from "./components/PurchaseCourseProtectedRoute";
import { ThemeProvider } from "./components/ThemeProvider";
import QuizResults from "./pages/Instructor/quiz/QuizResults";

// const routes = createBrowserRouter([
//   {
//     path:"/",
//     element:<RootLayout />,
//     children:[{
//       path:"/",
//       element:<HeroSection />

//     },
//     {
//       path:"/signup",
//       element: <SignUp />
//     },
//     {
//       path:"/login",
//       element: <Login />
//     }
//   ]
//   }
// ])
const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,

    children: [
      {
        index: true,
        element: (
          <>
            <HeroSection />
            <CourseCart />
          </>
        ),
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "login",
        element: (
          <AuthenticatedUser>
            <Login />
          </AuthenticatedUser>
        ),
      },
      {
        path: "learning",
        element: (
          <ProtectedRoute>
            <Learning />
          </ProtectedRoute>
        ),
      },
      {
        path: "courseinfo/:courseId",
        element: (
          <ProtectedRoute>
            <CourseInfo />
          </ProtectedRoute>
        ),
      },
      {
        path: "course/:courseId",
        element: (
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "courseinfo/:courseId/course-progress",
        element: (
          <ProtectedRoute>
           <PurchaseProtectedRoute>
             <CourseProgress />
           </PurchaseProtectedRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "courseinfo/:courseId/forum",
        element: (
          <ProtectedRoute>
            <Forum />
          </ProtectedRoute>
        ),
      },
      {
        path: "courseinfo/:courseId/assignments",
        element: (
          <ProtectedRoute>
            <Assignments />
          </ProtectedRoute>
        ),
      },
      {
        path: "courseinfo/:courseId/quizzes",
        element: (
          <ProtectedRoute>
            <Quizzes />
          </ProtectedRoute>
        ),
      },
      {
        path: "courseinfo/:courseId/quiz/:quizId",
        element: (
          <ProtectedRoute>
            <QuizAttempt />
          </ProtectedRoute>
        ),
      },
      {
        path: "courseinfo/:courseId/announcements",
        element: (
          <ProtectedRoute>
            <Announcements />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        ),
      },

      // instructor routes

      {
        path: "instructor",
        element: (
          <InstructorRoute>
            <AdminLayout />
          </InstructorRoute>
        ),
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "course",
            element: <TableOfCourses />,
          },
          {
            path: "course/create",
            element: <AddCourse />,
          },
          {
            path: "course/:courseId",
            element: <CourseTab />,
          },
          {
            path: "course/:courseId/lectures",
            element: <CreateLecture />,
          },
          {
            path: "course/:courseId/lectures/:lectureId",
            element: <EditLecture />,
          },
          {
            path: "course/:courseId/assignments",
            element: <ManageAssignments />,
          },
          {
            path: "course/:courseId/assignments/:assignmentId/submissions",
            element: <Submissions />,
          },
          {
            path: "course/:courseId/quizzes",
            element: <ManageQuizzes />,
          },
          {
            path: "course/:courseId/quiz/:quizId/results",
            element:<QuizResults />
          },
          {
            path: "course/:courseId/forum",
            element: <ManageForum />,
          },
          {
            path: "course/:courseId/announcements",
            element: <ManageAnnouncements />,
          },
        ],
      },

      // true administrator routes (separate from instructor /admin area)

      {
        path: "admin-panel",
        element: (
          <AdminRoute>
            <AdminPanelLayout />
          </AdminRoute>
        ),
        children: [
          {
            path: "dashboard",
            element: <AdminDashboard />,
          },
          {
            path: "users",
            element: <UserManagement />,
          },
          {
            path: "courses",
            element: <CourseOversight />,
          },
          {
            path: "announcements",
            element: <SystemAnnouncements />,
          },
        ],
      },
    ],
  },
]);
const App = () => {
  return (
    <main>
      <ThemeProvider>
        <RouterProvider router={routes}></RouterProvider>
      </ThemeProvider>
    </main>
  );
};

export default App;
