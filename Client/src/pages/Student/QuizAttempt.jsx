import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useGetQuizQuery,
  useSubmitQuizAttemptMutation,
} from "@/features/api/quizApi";
import { Timer } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const QuizAttempt = () => {
  const { quizId } = useParams();
  const { data, isLoading } = useGetQuizQuery(quizId);
  const [submitQuizAttempt] = useSubmitQuizAttemptMutation();

  const quiz = data?.quiz;

  const [answers, setAnswers] = useState({});
  const [secondsLeft, setSecondsLeft] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (quiz?.timeLimit && secondsLeft === null) {
      setSecondsLeft(quiz.timeLimit * 60);
    }
  }, [quiz, secondsLeft]);

  useEffect(() => {
    if (secondsLeft === null || result) return;
    if (secondsLeft <= 0) {
      submitHandler();
      return;
    }
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft, result]);

  const selectAnswer = (questionIndex, optionIndex) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: optionIndex }));
  };

  const submitHandler = async () => {
    const res = await submitQuizAttempt({ quizId, answers });
    if (res?.data?.result) {
      setResult(res.data.result);
    }
  };

  if (isLoading) {
    return <h1 className="mt-20">Loading...</h1>;
  }

  if (!quiz) {
    return <h1 className="mt-20">Quiz not found.</h1>;
  }

  const minutes = secondsLeft !== null ? Math.floor(secondsLeft / 60) : 0;
  const seconds = secondsLeft !== null ? secondsLeft % 60 : 0;

  return (
    <div className="mt-20 mx-6 md:mx-20 space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold">{quiz.title}</h1>
        {!result && (
          <span className="flex items-center gap-2 font-mono text-lg">
            <Timer size={20} />
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </span>
        )}
      </div>

      {result ? (
        <Card>
          <CardHeader>
            <CardTitle>Quiz Submitted</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">
              Score: {result.score} / {result.total}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {quiz.questions.map((question, qIndex) => (
            <Card key={question._id}>
              <CardHeader>
                <CardTitle className="text-base">
                  {qIndex + 1}. {question.questionText}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {question.options.map((option, oIndex) => (
                  <label
                    key={oIndex}
                    className={`flex items-center gap-3 p-2 rounded-md border cursor-pointer ${
                      answers[qIndex] === oIndex
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                        : "border-transparent"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${qIndex}`}
                      checked={answers[qIndex] === oIndex}
                      onChange={() => selectAnswer(qIndex, oIndex)}
                    />
                    {option}
                  </label>
                ))}
              </CardContent>
            </Card>
          ))}
          <Button onClick={submitHandler}>Submit Quiz</Button>
        </div>
      )}
    </div>
  );
};

export default QuizAttempt;
