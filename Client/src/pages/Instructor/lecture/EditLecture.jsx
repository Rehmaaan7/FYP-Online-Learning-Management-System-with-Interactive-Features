import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import {
  useDeleteLectureMutation,
  useGetLectureQuery,
  useUpdateLectureMutation,
} from "@/features/api/courseApi";

const editLecture = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { courseId, lectureId } = params;
  const [lectureTitle, setLectureTitle] = useState("");
  const [isPreviewFree, setIsPreviewFree] = useState(false);
  const [uploadVideoInfo, setUploadVideoInfo] = useState({});
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [disableBtn, setDisableBtn] = useState(true);

  const {
    data: getLectureData,
    isLoading: getLectureIsLoading,
    isSuccess: getLectureIsSuccess,
    refetch,
  } = useGetLectureQuery(lectureId);

  const lecture = getLectureData?.lecture;
  console.log(lecture);
  useEffect(() => {
    if (lecture) {
      setLectureTitle(lecture.lectureTitle);
      setIsPreviewFree(lecture.isPreviewFree);
      // refetch();
    }
  }, [lecture]);
  const [updateLecture, { data, isLoading, isSuccess, error }] =
    useUpdateLectureMutation();
  const [
    deleteLecture,
    {
      data: deleteLectureData,
      isLoading: deleteLectureIsLoading,
      isSuccess: deleteLectureIsSuccess,
    },
  ] = useDeleteLectureMutation();

  const fileCHangeHandler = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setMediaProgress(true);
      try {
        const res = await axios.post(
          "http://localhost:5000/api/something/media/video",
          formData,
          {
            onUploadProgress: ({ loaded, total }) => {
              setUploadProgress(Math.round((loaded * 100) / total));
            },
          },
        );

        if (res.data.success) {
          console.log("response is : ", res.data);
          setUploadVideoInfo({
            lectureUrl: res.data.data.secure_url,
            publicId: res.data.data.public_id,
          });
          setDisableBtn(false);
          toast.success(res?.data?.message);
        }
      } catch (error) {
        console.log("error from front end upload btn handler: ", error);
        toast.error(error?.response?.data?.message || "uploading video failed");
      } finally {
        setMediaProgress(false);
      }
    }
  };

  const updateButtonHandler = () => {
    updateLecture({
      lectureTitle,
      videoInfo: uploadVideoInfo,
      isPreviewFree,
      courseId,
      lectureId,
    });
  };

  const removeBtnHandler = async () => {
    await deleteLecture(lectureId);
    navigate(-1);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
    }
    if (error) {
      toast.error(error?.data?.message);
    }
    if (deleteLectureIsSuccess) {
      toast.success(deleteLectureData?.message);
    }
  }, [isSuccess, error, deleteLectureIsSuccess]);
  const videoSrc = uploadVideoInfo.lectureUrl || lecture?.lectureUrl;
  return (
    <>
      <div className="mt-20">
        <div>
          <NavLink>
            <button onClick={() => navigate(-1)}>
              <ArrowLeft />
            </button>
          </NavLink>
          <h1 className=" font-bold text-xl">update your lecture</h1>
        </div>
        <div>
          <Card>
            <CardHeader>
              <div className="p-4">
                <CardTitle>
                  edit lexture
                  <CardDescription>edit lecture and click save</CardDescription>
                </CardTitle>
              </div>
              <div>
                <Button
                  className="bg-red-500 hover:bg-red-700"
                  onClick={removeBtnHandler}
                  disabled={deleteLectureIsLoading}
                >
                  {deleteLectureIsLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      ...removing
                    </>
                  ) : (
                    " Remove lecture"
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Title</Label>

                <Input
                  type="text"
                  // placeholder="title your lecture"
                  value={lectureTitle}
                  onChange={(e) => setLectureTitle(e.target.value)}
                />
              </div>
              <div>
                <Label> upload video</Label>
                <Input
                  type="file"
                  accept="video/*"
                  className="w-fit"
                  onChange={fileCHangeHandler}
                />
              </div>
              <div>
                {videoSrc && (
                  <video key={videoSrc} width="300" controls>
                    <source src={videoSrc} type="video/mp4" />
                  </video>
                )}
              </div>
              <div className="flex flex-row">
                <div className="flex items-center space-x-2 ">
                  <Label htmlFor="airplane-mode">Preview Free ?</Label>
                  <Switch
                    id="airplane-mode"
                    checked={isPreviewFree}
                    onCheckedChange={setIsPreviewFree}
                  />
                </div>
              </div>
              {mediaProgress && (
                <div className="py-4">
                  <Progress value={uploadProgress} />

                  {uploadProgress < 100 ? (
                    <h1>{uploadProgress}% Uploading...</h1>
                  ) : (
                    <h1>Processing video...</h1>
                  )}
                </div>
              )}
              <div>
                <Button disabled={isLoading} onClick={updateButtonHandler}>
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      ...updating
                    </>
                  ) : (
                    "update lecture"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default editLecture;
