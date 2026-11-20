import LoadingScreen from "@/components/LoadingScreen";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  useGetCourseProgressQuery,
  useMarkCompletedMutation,
  useMarkInCompletedMutation,
  useUpdateProgressMutation,
} from "@/features/api/progressApi";
import { Check, CheckCircle, PlayCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseProgress = () => {
  const { courseId } = useParams();
  const [currentLecture, setCurrentLecture] = useState(null);

  const { data, isLoading, isError, isSuccess, refetch } =
    useGetCourseProgressQuery(courseId);
  const [
    updateProgress,
    { data: updateProgressData, isSuccess: updateProgressIsSuccess },
  ] = useUpdateProgressMutation();
  const [
    markCompleted,
    { data: markCompletedData, isSuccess: markCompletedIsSuccess },
  ] = useMarkCompletedMutation();
  const [
    markInCompleted,
    { data: markInCompletedData, isSuccess: markInCompletedIsSuccess },
  ] = useMarkInCompletedMutation();
  useEffect(() => {
    if (markCompletedIsSuccess) {
      toast.success(markCompletedData.message);
    }
    if (markInCompletedIsSuccess) {
      toast.success("course and lectures previous state restored");
    }
  }, [markCompletedIsSuccess, markInCompletedIsSuccess]);
  if (isLoading) {
    return <LoadingScreen />;
  }
  const { courseData, lectureProgress, completed } = data?.data || {};

  const initialLecture =
    currentLecture || (courseData?.lectures && courseData?.lectures[0]);

  const lectureCompleted = (lectureId) => {
    return lectureProgress?.some((progress) => {
      return progress?.lectureId === lectureId && progress?.viewed;
    });
  };
  const selectLectureHandler = (lecture) => {
    setCurrentLecture(lecture);
  };
  const lectureProgressHandler = async (lectureId) => {
    await updateProgress({ courseId, lectureId });

    refetch();
  };

  const markCompletedHandler = async () => {
    const res = await markCompleted(courseId);
    console.log(res);
    refetch();
  };

  const markInCompletedHandler = async () => {
    await markInCompleted(courseId);

    refetch();
  };

  return (
    <div className="mt-20 mx-20">
      <div className="flex justify-between flex-row gap-10 ">
        <h1 className="font-bold text-4xl italic">{courseData?.title} </h1>
        <Button
          variant="outline"
          onClick={completed ? markInCompletedHandler : markCompletedHandler}
        >
          {completed ? (
            "Restore Previous"
          ) : (
            <div className="flex flex-row gap-4 m-2">
              <CheckCircle className="text-green-800" />
              <span>Mark Completed All</span>
            </div>
          )}
        </Button>
      </div>
      <div className="flex flex-row justify-between gap-10 border-t mt-10">
        <div className=" w-4/3 md:w-4/3 h-fit shadow-lg border-t flex flex-col m-auto">
          {!initialLecture?.lectureUrl ? (
            <p className="text-white">Loading video...</p>
          ) : (
            <video
              src={currentLecture?.lectureUrl || initialLecture?.lectureUrl}
              type="video/mp4"
              width={"100%"}
              height={"100%"}
              controls={true}
              //         onPlay={() =>
              // lectureProgressHandler(currentLecture?._id || initialLecture?._id)
              // }

              onPlay={() =>
                lectureProgressHandler(
                  currentLecture?._id || initialLecture?._id,
                )
              }
            ></video>

            // <ReactPlayer width="100%" height="100%" controls={true}
            // onPlay={()=>lectureProgressHandler(currentLecture?._id || initialLecture?._id)}
            // >
            //   <source src={initialLecture?.lectureUrl} type="video/mp4" />
            // </ReactPlayer>
          )}
          <h1 className="mt-5 text-xl font-bold m-4">
            Lecture-{0 + 1}-{initialLecture?.lectureTitle}
          </h1>
        </div>
        <div className="w-full md:w-2/3 h-fit border-l ">
          <h2 className="m-8 font-bold ">Lectures </h2>
          <div>
            {courseData?.lectures?.map((lecture, indx) => (
              <Card
                key={indx}
                className={`m-3 trnsition transform hover:bg-gray-300 hover:cursor-pointer ${lecture?._id === currentLecture?._id ? "bg-gray-400" : ""}`}
                onClick={() => selectLectureHandler(lecture)}
              >
                <CardContent
                  className={"flex items-center justify-between gap-10"}
                >
                  <div className="flex flex-row gap-4">
                    {lectureCompleted(lecture._id) ? (
                      <CheckCircle className="text-green-500" />
                    ) : (
                      <PlayCircle className="text-gray-800" />
                    )}
                    <div>
                      <CardTitle className={"text-lg font-medium"}>
                        {" "}
                        {lecture?.lectureTitle}
                      </CardTitle>
                    </div>
                  </div>
                  {lectureCompleted(lecture?._id) && (
                    <Badge className={"bg-blue-200 text-blue-700"}>
                      {" "}
                      viewed
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
