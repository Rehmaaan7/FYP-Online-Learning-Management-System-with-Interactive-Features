import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useCreateQuizMutation,
  useDeleteQuizMutation,
  useGetQuizzesQuery,
} from "@/features/api/quizApi";
import { Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const emptyQuestion = () => ({
  questionText: "",
  options: ["", "", "", ""],
  correctAnswer: 0,
});

const ManageQuizzes = () => {
  const { courseId } = useParams();
  const { data, refetch } = useGetQuizzesQuery(courseId);
  const [createQuiz, { isLoading: creating }] = useCreateQuizMutation();
  const [deleteQuiz] = useDeleteQuizMutation();
  const navigate = useNavigate()

  const [title, setTitle] = useState("");
  const [timeLimit, setTimeLimit] = useState(10);
  const [questions, setQuestions] = useState([emptyQuestion()]);

  const quizzes = data?.quizzes || [];

  const updateQuestion = (index, fieldRecieved, valueRecieved) => {
    setQuestions((existingQuestions) =>
      existingQuestions.map((question, questionIndex) =>
        questionIndex === index
          ? { ...question, [fieldRecieved]: valueRecieved }
          : question,
      ),
    );
  };

  const updateOption = (questionIndex, optionIndex, value) => {
    setQuestions((existingQuestions) =>
      existingQuestions.map((question, index) =>
        index === questionIndex
          ? {
              ...question,
              options: question.options.map((option, singOptIndex) =>
                singOptIndex === optionIndex ? value : option,
              ),
            }
          : question,
      ),
    );
  };

  const addQuestion = () => setQuestions((prev) => [...prev, emptyQuestion()]);

  const removeQuestion = (index) =>
    setQuestions((prev) => prev.filter((_, i) => i !== index));

  const createHandler = async (e) => {
    e.preventDefault();
    if (!title) return;
    await createQuiz({ courseId, title, timeLimit, questions });
    toast.success("quiz created");
    setTitle("");
    setTimeLimit(10);
    setQuestions([emptyQuestion()]);
    refetch();
  };

  const deleteHandler = async (id) => {
    await deleteQuiz(id);
    toast.success("quiz deleted");
    refetch();
  };

  return (
    <div className="mt-20 space-y-6">
      <h1 className="text-2xl font-bold">Manage Quizzes</h1>

      <Card>
        <CardHeader>
          <CardTitle>Create Quiz</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={createHandler} className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
              <Label>Time Limit (minutes)</Label>
              <Input
                type="number"
                value={timeLimit}
                onChange={(e) => setTimeLimit(Number(e.target.value))}
              />
            </div>

            <div className="space-y-4">
              {questions.map((question, questionIndex) => (
                <Card key={questionIndex} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Label>Question {questionIndex + 1}</Label>
                    {questions.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeQuestion(questionIndex)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    )}
                  </div>
                  <Input
                    placeholder="Question text"
                    value={question.questionText}
                    onChange={(e) =>
                      updateQuestion(
                        questionIndex,
                        "questionText",
                        e.target.value,
                      )
                    }
                    className="mb-3"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {question.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className="flex items-center gap-2"
                      >
                        <input
                          type="radio"
                          name={`correct-${questionIndex}`}
                          checked={question.correctAnswer === optionIndex}
                          onChange={() =>
                            updateQuestion(
                              questionIndex,
                              "correctAnswer",
                              optionIndex,
                            )
                          }
                        />
                        <Input
                          placeholder={`Option ${optionIndex + 1}`}
                          value={option}
                          onChange={(e) =>
                            updateOption(
                              questionIndex,
                              optionIndex,
                              e.target.value,
                            )
                          }
                        />
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>

            <Button type="button" variant="outline" onClick={addQuestion}>
              <Plus className="mr-2" size={16} />
              Add Question
            </Button>

            <div>
              <Button type="submit" disabled={creating}>
                Create Quiz
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {quizzes.map((quiz) => (
          <Card
            key={quiz._id}
            className="cursor-pointer hover:shadow-md transition"
            onClick={() =>
              navigate(
                `/instructor/course/${courseId}/quiz/${quiz._id}/results`,
              )
            }
          >
            <CardContent className="flex items-center justify-between py-4">
              <div>
                <p className="font-medium">{quiz.title}</p>
                <p className="text-sm text-gray-500">
                  {quiz.questions?.length || 0} questions, {quiz.timeLimit} min
                </p>
              </div>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => deleteHandler(quiz._id)}
              >
                <Trash2 size={16} />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ManageQuizzes;
