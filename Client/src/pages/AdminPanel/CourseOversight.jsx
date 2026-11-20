import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useDeleteCourseAdminMutation,
  useGetAllCoursesAdminQuery,
  useSetCourseStatusMutation,
} from "@/features/api/adminApi";
import { Trash2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const CourseOversight = () => {
  const { data, refetch } = useGetAllCoursesAdminQuery();
  const [setCourseStatus] = useSetCourseStatusMutation();
  const [deleteCourse] = useDeleteCourseAdminMutation();

  const courses = data?.courses || [];

  const toggleStatusHandler = async (courseId, currentStatus) => {
    const newStatus = currentStatus === true ? false : true;
    await setCourseStatus({ courseId, status: newStatus });
    toast.success(`course set to ${newStatus ? "public" : "private"}`);
    refetch();
  };

  const deleteHandler = async (courseId) => {
    toast("Are you sure you want to delete this post?", {
      action: {
        label: "Delete",
        onClick: async () => {
          await deleteCourse(courseId);
          refetch();
          toast.success("course deleted");
        },
      },
    });
  };

  return (
    <div className="mt-20 space-y-6">
      <h1 className="text-2xl font-bold">Course Oversight</h1>

      {courses.length === 0 ? (
        <p className="text-gray-500">No courses in the system yet.</p>
      ) : (
        <div className="space-y-3">
          {courses.map((course) => (
            <Card key={course?._id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-base">
                  {course?.title}
                  <Badge
                    className={
                      course?.isPublished === true
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }
                  >
                    {course?.isPublished ? "published" : "private"}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  <p>Instructor: {course?.creator?.name}</p>
                  <p>Category: {course?.category}</p>
                  <p>
                    Enrolled students: {course.enrolledStudents?.length || 0}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() =>
                      toggleStatusHandler(course?._id, course?.isPublished)
                    }
                  >
                    {course?.isPublished ? "make private" : "make publish"}
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => deleteHandler(course._id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseOversight;
