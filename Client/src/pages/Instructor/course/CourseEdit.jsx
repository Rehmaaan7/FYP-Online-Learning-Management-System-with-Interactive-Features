import RichTextEditor from "@/components/RichTextdocument";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGetCourseQuery,
  useToglePublishMutation,
  useUpdateCoureMutation,
} from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseEdit = () => {
  const navigate = useNavigate();
  const params = useParams();
  const courseId = params.courseId;
 

  const [previewThumbnail, setpreviewThumbnail] = useState("");

  const {
    data: getCourseData,
    isLoading: getCourseIsLoading,
    isSuccess: getCourseIsSuccess,
    error: getCourseError, refetch
  } = useGetCourseQuery(courseId, { refetchOnMountOrArgChange: true });

  const [input, setInput] = useState({
    title: "",
    subTitle: "",
    description: "",
    category: "",
    level: "",
    price: "",
    isPublished:false,
    thumbnail: "",
  });
  const course = getCourseData?.course;
  useEffect(() => {
    if (course) {
      setInput({
        title: course.title,
        subTitle: course.subTitle,
        description: course.description || "",
        category: course.category,
        level: course.level,
        price: course.price,
       isPublished:course.isPublished,
        thumbnail: "",
      });
      setpreviewThumbnail(course.thumbnail);
      console.log("course description:", course?.description);
    }
  }, [course]);

  const [updateUser, { data, isLoading, isSuccess, error }] =
    useUpdateCoureMutation();
  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };
  const toglePublishHandler = () =>{
    if (input.isPublished===true) {
      setInput((prev)=>({...prev, isPublished:false}))
    }
    else{
      setInput((prev)=>({...prev, isPublished:true}))
    }
  }
  const handleCategory = (value) => {
    setInput((prev) => ({ ...prev, category: value }));
  };
  const handleLevel = (value) => {
    setInput((prev) => ({ ...prev, level: value }));
  };

  const handlePrice = (e) => {
    setInput((prev) => ({ ...prev, price: e.target.value }));
  };

  const handleThumbnail = (value) => {
    const file = value.target.files?.[0];
    if (file) {
      setInput((prev) => ({ ...prev, thumbnail: file }));
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setpreviewThumbnail(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };
  const updateHandler = () => {
    const formData = new FormData();
    formData.append("title", input.title);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("level", input.level);
    formData.append("price", input.price);
    formData.append("isPublished",input.isPublished)
    formData.append("thumbnail", input.thumbnail);

    updateUser({ formData, courseId });
    
    console.log("course description:", course?.description);
  };
  // const [
  //   toglePublish,
  //   { data: toglePublishData, isSuccess: toglePublishIsSuccess },
  // ] = useToglePublishMutation();

  // const toglePublishHandler = async(event) => {
  //   try {
  //     const responseTwo = await toglePublish({courseId, query:event})
  //     if (responseTwo?.data) {
  //       refetch()
  //       toast.success(responseTwo?.data?.message)
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     toast.error(toglePublishData?.message)
  //   }
  // };


  const deleteHandler = ()=>{
    
  }
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "course updated successfully");
      navigate("/instructor/course");
    }
    if (error) {
      toast.error(error?.data?.message || "updation of course failed");
    }
  }, [isSuccess, error]);
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Basic course information</CardTitle>
          <CardDescription>
            make changes to your courses here and save when you are done
          </CardDescription>
        </div>
        <div className="flex flex-row gap-3">
          <Button
            variant="outline"
            onClick={toglePublishHandler}
          >
            {input.isPublished ? "Make private" : "Make public"}
          </Button>
          <Button
          onClick={deleteHandler}
          >delete course</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-5">
          <div>
            <Label>Title</Label>
            <Input
              name="title"
              value={input.title}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>SubTitle</Label>
            <Input
              name="subTitle"
              value={input.subTitle}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Description</Label>
            <RichTextEditor
              input={input.description}
              setInput={(desc) =>
                setInput((prev) => ({ ...prev, description: desc }))
              }
            />
          </div>
          <div className="flex flex-row gap-6">
            <div>
              <Label>Select Category: </Label>
              {/* onValueChange={catchCategory} */}
              <Select value={input.category} onValueChange={handleCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="programming">programming</SelectItem>
                    <SelectItem value="networking">networking</SelectItem>
                    <SelectItem value="artificial intelligence">
                      artificial intelligence
                    </SelectItem>
                    <SelectItem value="artificial intelligence">
                      artificial intelligence
                    </SelectItem>
                    <SelectItem value="artificial intelligence">
                      artificial intelligence
                    </SelectItem>
                    <SelectItem value="artificial intelligence">
                      artificial intelligence
                    </SelectItem>
                    <SelectItem value="artificial intelligence">
                      artificial intelligence
                    </SelectItem>
                    <SelectItem value="artificial intelligence">
                      artificial intelligence
                    </SelectItem>
                    <SelectItem value="artificial intelligence">
                      artificial intelligence
                    </SelectItem>
                    <SelectItem value="artificial intelligence">
                      artificial intelligence
                    </SelectItem>
                    <SelectItem value="artificial intelligence">
                      artificial intelligence
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label> select Level</Label>
              <Select onValueChange={handleLevel} value={input.level}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advance">Advance</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Price</Label>
              <Input
                value={input.price}
                onChange={handlePrice}
                type="number"
                placeholder="Rs"
              />
            </div>
          </div>
          <div className="w-60">
            <Label>thumbnail</Label>
            <Input
              className="w-fit"
              type="file"
              accept="image/*"
              onChange={handleThumbnail}
            />
            {previewThumbnail && (
              <img
                src={previewThumbnail}
                className="w-60 h-40 object-cover rounded-md"
              />
            )}
          </div>
        </div>
        <div className="flex flex-row gap-3 mt-4">
          <Button onClick={() => navigate("/admin/course")}> cancel</Button>
          <Button disabled={isLoading} onClick={updateHandler}>
            {isLoading ? (
              <>
                {" "}
                <Loader2 className="animate-spin" /> loading
              </>
            ) : (
              "update"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseEdit;
