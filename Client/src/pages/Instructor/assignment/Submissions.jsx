import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  useGetSubmissionsQuery,
  useGradeSubmissionMutation,
} from "@/features/api/assignmentApi";
import { FileText } from "lucide-react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const Submissions = () => {
  const { assignmentId } = useParams();
  const { data, refetch } = useGetSubmissionsQuery(assignmentId);
  const [gradeSubmission] = useGradeSubmissionMutation();

  const [drafts, setDrafts] = useState({});

  const submissions = data?.submittedAssignments || [];

  const updateDraft = (submissionId, field, value) => {
    setDrafts((prev) => ({
      ...prev,
      [submissionId]: { ...prev[submissionId], [field]: value },
    }));
  };

  const saveResult = async (submissionId) => {
    const draft = drafts[submissionId] || {};
    await gradeSubmission({
      submissionId,
      grade: draft.grade,
      feedback: draft.feedback,
    });
    toast.success("marks saved");
    refetch();
  };

  return (
    <div className="mt-20 space-y-6">
      <h1 className="text-2xl font-bold flex items-center gap-3">
        <FileText size={24} />
        Submissions
      </h1>

      {submissions.length === 0 ? (
        <p className="text-gray-500">No submissions yet.</p>
      ) : (
        <div className="space-y-4">
          {submissions.map((submission) => (
            <Card key={submission._id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-base">
                  {submission.studentId?.name}
                  {submission.grade != null && (
                    <Badge>{submission.grade} / 100</Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <a
                  href={submission.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline text-sm"
                >
                  View submitted file
                </a>
                <p className="text-xs text-gray-400">
                  Submitted: {new Date(submission.submittedAt).toLocaleString()}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-3">
                  <Input
                    type="number"
                    placeholder="marks"
                    defaultValue={submission.grade ?? ""}
                    onChange={(e) =>
                      updateDraft(submission._id, "grade", e.target.value)
                    }
                  />
                  <Textarea
                    placeholder="Feedback"
                    defaultValue={submission.feedback}
                    onChange={(e) =>
                      updateDraft(submission._id, "feedback", e.target.value)
                    }
                  />
                </div>
                <Button onClick={() => saveResult(submission._id)}>
                  Save Result
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Submissions;
