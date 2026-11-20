
import EmptyAssignments from "@/components/EmptyAssignments";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  useGetAssignmentsQuery,
  useSubmitAssignmentMutation,
} from "@/features/api/assignmentApi";
import { CalendarClock, FileText } from "lucide-react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const Assignments = () => {
  const { courseId } = useParams();
  const { data, isLoading } = useGetAssignmentsQuery(courseId);
  const [submitAssignment] = useSubmitAssignmentMutation();
  const [file, setFile] = useState(null);
  const [activeAssignmentId, setActiveAssignmentId] = useState(null);

  const assignments = data?.assignments || [];

  const submitHandler = async (assignmentId) => {
    const formData = new FormData()
    formData.append("file",file)
    const response = await submitAssignment({ assignmentId, formData });
    if (response?.error) {
      toast.error(response.error?.data?.message || "submission failed");
      return;
    }
    toast.success("assignment submitted");
    setFile(null);
    setActiveAssignmentId(null);
  };

  if (isLoading) {
    return <h1 className="mt-20">Loading...</h1>;
  }

  return (
    <div className="mt-20 mx-6 md:mx-20 space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
        <FileText size={28} />
        Assignments
      </h1>

      {assignments.length === 0 ? (
       <EmptyAssignments />
      ) : (
        <div className="space-y-4">
          {assignments.map((assignment) => {
            const isPastDeadline = new Date() > new Date(assignment.deadline);
            return (
              <Card key={assignment._id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {assignment.title}
                    {isPastDeadline && (
                      <Badge variant="destructive">Deadline passed</Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p>{assignment.instructions}</p>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <CalendarClock size={14} />
                    Deadline: {new Date(assignment.deadline).toLocaleString()}
                  </p>

                  {activeAssignmentId === assignment._id ? (
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Input
                        type="file"
                        accept=".pdf,.doc,.docx,.ppt,.pptx"
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                      <Button
                        onClick={() => submitHandler(assignment._id)}
                        disabled={isPastDeadline}
                      >
                        Submit
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      disabled={isPastDeadline}
                      onClick={() => setActiveAssignmentId(assignment._id)}
                    >
                      Submit Assignment
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Assignments;
