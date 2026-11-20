import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAllCoursesAdminQuery, useGetUsersQuery } from "@/features/api/adminApi";
import React from "react";

const AdminDashboard = () => {
  const { data: usersData } = useGetUsersQuery();
  const { data: coursesData } = useGetAllCoursesAdminQuery();

  const users = usersData?.users || [];
  const courses = coursesData?.courses || [];

  const studentCount = users.filter((user) => user.role === "student").length;
  const instructorCount = users.filter((user) => user.role === "instructor").length;
  const activeCourseCount = courses.filter((course) => course.isPublished === true).length;

  return (
    <div className="space-y-6 mt-18">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">{users.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Students</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">{studentCount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Instructors</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-purple-600">{instructorCount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-orange-600">{activeCourseCount}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
