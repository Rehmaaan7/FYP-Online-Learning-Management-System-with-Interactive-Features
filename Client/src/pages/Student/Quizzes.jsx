import EmptyQuizzes from "@/components/EmptyQuizes";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetQuizzesQuery } from "@/features/api/quizApi";
import { ListChecks, Timer } from "lucide-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const Quizzes = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetQuizzesQuery(courseId);

  const quizzes = data?.quizzes || [];

  if (isLoading) {
    return <h1 className="mt-20">Loading...</h1>;
  }

  return (
    <div className="mt-20 mx-6 md:mx-20 space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
        <ListChecks size={28} />
        Quizzes
      </h1>

      {quizzes.length === 0 ? (
        <EmptyQuizzes />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quizzes.map((quiz) => (
            <Card key={quiz._id}>
              <CardHeader>
                <CardTitle>{quiz.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <Timer size={14} />
                  Time limit: {quiz.timeLimit} minutes
                </p>
                <p className="text-sm text-gray-500">
                  {quiz.questions?.length || 0} questions
                </p>
                <Button
                  onClick={() =>
                    navigate(`/courseinfo/${courseId}/quiz/${quiz._id}`)
                  }
                >
                  Attempt Quiz
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Quizzes;
