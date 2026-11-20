import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useCreateLectureMutation,
  useGetLecturesQuery,
} from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Lectures from "./Lectures";

const CreateLecture = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const courseId = params.courseId;

  const [CreateLecture, { data, isLoading, isSuccess, error }] =
    useCreateLectureMutation();

  const createLectureHandler = () => {
    CreateLecture({ lectureTitle, courseId });
  };
  
  const {
    data: getLecturesData,
    isLoading: getLecturesIsLoading,
    isSuccess: getLecturesIsSuccess,
    error: getLecturesError,
    refetch
  } = useGetLecturesQuery(courseId);


  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data?.message || "lecture created successfully");
    }
    if (error) {
      toast.error(error?.data?.message || "lecture creation failed");
    }
  }, [isSuccess, error]);

  return (
    <div className="flex-1 mx-10 mt-20">
      <div className="mb-4">
        <h1 className="font-bold text-xl">add Lectures here</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo
          voluptates ullam dolorum sunt possimus rerum dolore ex? Necessitatibus
          cumque, quos, error illo, blanditiis cupiditate sapiente architecto
          recusandae provident vero consequatur.
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <Label> Lecture Title : </Label>
          <Input
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="enter your lecture title"
          ></Input>
        </div>

        <div className="flex gap-4">
          <Button onClick={() => navigate(-1)} variant="outline">
            Back
          </Button>
          <Button disabled={isLoading} onClick={createLectureHandler}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                please wait
              </>
            ) : (
              " create lecture "
            )}
          </Button>
        </div>
        <div>
          {getLecturesError ? (
            <h1> failed to load lectures</h1>
          ) : getLecturesIsLoading ? (
            <div>
              {" "}
              <Loader2 className="animmate-spin" />
              ...please wait{" "}
            </div>
          ) : getLecturesData.lectures.length === 0 ? (<h1> no lectures added yet </h1>) : (
           getLecturesData.lectures.map((lecture, index)=>(
             <Lectures key={lecture._id} index={index} lecture={lecture} />
           ))
          )
          }
        </div>
      </div>
    </div>
  );
};

export default CreateLecture;
