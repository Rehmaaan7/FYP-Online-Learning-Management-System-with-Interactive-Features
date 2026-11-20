import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateAssignmentMutation,
  useDeleteAssignmentMutation,
  useGetAssignmentsQuery,
} from "@/features/api/assignmentApi";
import { Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const ManageAssignments = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { data, refetch } = useGetAssignmentsQuery(courseId);
  const [createAssignment, { isLoading: creating }] =
    useCreateAssignmentMutation();
  const [deleteAssignment] = useDeleteAssignmentMutation();

  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [deadline, setDeadline] = useState("");

  const assignments = data?.assignments || [];

  const createHandler = async (e) => {
    e.preventDefault();
    if (!title || !deadline) return;
    await createAssignment({ courseId, title, instructions, deadline });
    toast.success("assignment created");
    setTitle("");
    setInstructions("");
    setDeadline("");
    refetch();
  };

  const deleteHandler = async (id) => {
    await deleteAssignment(id);
    toast.success("assignment deleted");
    refetch();
  };

  return (
    <div className="mt-20 space-y-6">
      <h1 className="text-2xl font-bold">Manage Assignments</h1>

      <Card>
        <CardHeader>
          <CardTitle>Create Assignment</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={createHandler} className="space-y-3">
            <div>
              <Label>Title</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
              <Label>Instructions</Label>
              <Textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
              />
            </div>
            <div>
              <Label>Deadline</Label>
              <Input
                type="datetime-local"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={creating}>
              <Plus className="mr-2" size={16} />
              Create
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {assignments.map((assignment) => (
          <Card key={assignment._id}>
            <CardContent className="flex items-center justify-between py-4">
              <div>
                <p className="font-medium">{assignment.title}</p>
                <p className="text-sm text-gray-500">
                  Deadline: {new Date(assignment.deadline).toLocaleString()}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() =>
                    navigate(
                      `/instructor/course/${courseId}/assignments/${assignment._id}/submissions`,
                    )
                  }
                >
                  Submissions
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => deleteHandler(assignment._id)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ManageAssignments;
