import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  useCheckoutSessionMutation,
  useGetPurchaseDetialsWithStatusQuery,
} from "@/features/api/purchaseApi";
import { BadgeInfo, Loader2, Lock, PlayCircle, Wind } from "lucide-react";
import React, { useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import ReactPlayer from "react-player";

function CourseInfo() {
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();

  const [checkoutSession, { data, isLoading, isSuccess, isError, error }] =
    useCheckoutSessionMutation();

  const purchaseHandler = async () => {
    await checkoutSession(courseId);
  };

  const { data: detailsData, isSuccess: detailsIsSuccess } =
    useGetPurchaseDetialsWithStatusQuery(courseId);

  // const { course, purchased } = detailsData || {};
  const { course } = detailsData || {};
  const purchased = true;

  console.log(detailsData);

  const continueHandler = () => {
    navigate(`course-progress`);
  };

  useEffect(() => {
    if (isSuccess) {
      if (data?.url) {
        window.location.href = data?.url;
      } else {
        toast.error("server response error");
      }
    }
    if (isError) {
      toast.error(error?.message || "error to create checkout session");
    }
  }, [data, isSuccess, isError, error]);
  console.log(
    "this is the videoUrl for the first video : ",
    course?.lectures[0]?.lectureUrl,
  );
  return (
    <div className="mt-16 space-y-5">
      <div className=" bg-gray-500 text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold "> {course?.title}</h1>
          <p>{course?.subTitle}</p>
          <p>
            Created By :
            <span className="underline italic"> {course?.creator?.name}</span>
          </p>
          <div className="flex flex-row gap-2">
            <BadgeInfo size={18} />
            <p>last updated : {course?.createdAt.split("T")[0]}</p>
          </div>
          students enrolled : {course?.enrolledStudents.length}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-wrap gap-4 text-sm">
        <NavLink to={`/courseinfo/${courseId}/forum`} className="hover:text-blue-600 underline">Forum</NavLink>
        <NavLink to={`/courseinfo/${courseId}/assignments`} className="hover:text-blue-600 underline">Assignments</NavLink>
        <NavLink to={`/courseinfo/${courseId}/quizzes`} className="hover:text-blue-600 underline">Quizzes</NavLink>
        <NavLink to={`/courseinfo/${courseId}/announcements`} className="hover:text-blue-600 underline">Announcements</NavLink>
      </div>
      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        <div className="flex-1 space-y-4 w-full lg:w-1/2">
          <h1 className="font-bold text-3xl"> Description </h1>
          <p dangerouslySetInnerHTML={{ __html: course?.description }} />

          <Card className="w-full">
            <CardHeader>
              <CardTitle>Lectures: </CardTitle>
              <CardDescription>{course?.lectures?.length} </CardDescription>
            </CardHeader>
            <CardContent className={"space-y-4"}>
              {course?.lectures?.map((lecture, index) => (
                <div key={index} className="flex items-center gap-3 text-sm">
                  <span>
                    {purchased ? <PlayCircle size={14} /> : <Lock size={14} />}
                  </span>
                  <p>{lecture?.lectureTitle}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="w-full lg:w-1/2">
          <Card>
            <CardContent className="p-4 flex flex-col">
              <div className="w-full aspect-video mb-4">
                {/* <ReactPlayer
  url="https://res.cloudinary.com/dkeunqwyp/video/upload/v1782036428/b2h5myeq22vadro6p73t.mp4"
   controls
  width="100%"
  height="100%"
  playing={false}
  light={false}
/> */}

                {!course?.lectures?.[0]?.lectureUrl ? (
                  <p className="text-white">Loading video...</p>
                ) : (
                  <ReactPlayer
                    width="100%"
                    height="100%"
                    // url ={course?.lectures?.[0]?.lectureUrl}
                    controls={true}  >
                  
                    <source
                      src={course.lectures[0].lectureUrl}
                      type="video/mp4"
                    />
                  </ReactPlayer>
                )}
                {/* {console.log(ReactPlayer)} */}
                {/* <ReactPlayer
               
               /> */}
              </div>
              <h1> {course?.lectures[0]?.lectureTitle}</h1>
              <Separator />
              <h1 className="text-lg md:text-xl font-bold">{course?.price}</h1>
            </CardContent>
            <CardFooter>
              {purchased ? (
                <>
                  {" "}
                  <Button
                    onClick={continueHandler}
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="m-4 animate-spin" /> please wait...
                      </>
                    ) : (
                      "Continue Course"
                    )}
                  </Button>{" "}
                </>
              ) : (
                <>
                  {" "}
                  <Button
                    onClick={purchaseHandler}
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading ? (
                      <>
                        {" "}
                        <Loader2 className="m-4 animate-spin" /> please wait...
                      </>
                    ) : (
                      "Purchase Course"
                    )}
                  </Button>{" "}
                </>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CourseInfo;
