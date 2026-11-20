import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useGetCreatorCoursesQuery } from "@/features/api/courseApi";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit2 } from "lucide-react";

const TableOfCourses = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useGetCreatorCoursesQuery();

  

  return (
    <div className="mt-15">
      <Button onClick={()=>navigate("create")}>create new course</Button>
      <Table className={"mt-4"}>
        <TableCaption>A list of your recent courses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.courses?.map((course) => (
            <TableRow key={course._id}>
              <TableCell className="font-medium">{course.price}</TableCell>
              <TableCell>{course.isPublished ? "public": "private"}</TableCell>
              <TableCell>{course?.title}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" onClick={()=>navigate(`${course._id}`)}>
                  <Edit2 />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          {/* <TableRow>
            <TableCell colSpan={3}>$2,500.00</TableCell>
            <TableCell className="text-right">Total</TableCell>
          </TableRow> */}
        </TableFooter>
      </Table>
    </div>
  );
};

export default TableOfCourses;
