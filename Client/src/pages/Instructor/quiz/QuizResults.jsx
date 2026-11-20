import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { useGetResultsQuery } from "@/features/api/quizApi";

import { useParams } from "react-router-dom";

const QuizResults = () => {
  const { quizId } = useParams();

  const { data, isLoading } = useGetResultsQuery(quizId);

  const results = data?.results || [];

  if (isLoading) {
    return <h1 className="mt-20">Loading...</h1>;
  }

  return (
    <div className="mt-20 space-y-6">
      <h1 className="text-3xl font-bold">
        Quiz Results
      </h1>

      {results.length === 0 ? (
        <p className="text-gray-500">
          No submissions yet.
        </p>
      ) : (
        results.map((result) => (
          <Card key={result._id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <div>
                  {result.userId?.name}
                </div>

                <Badge>
                  {result.score} / {result.totalQuestions}
                </Badge>
              </CardTitle>

              <p className="text-sm text-gray-500">
                {result.userId?.email}
              </p>
            </CardHeader>

            <CardContent className="space-y-2">
              <p>
                <span className="font-medium">
                  Quiz:
                </span>{" "}
                {result.quizId?.title}
              </p>

              <p>
                <span className="font-medium">
                  Score:
                </span>{" "}
                {result.score} / {result.totalQuestions}
              </p>

              <p>
                <span className="font-medium">
                  Percentage:
                </span>{" "}
                {(
                  (result.score /
                    result.totalQuestions) *
                  100
                ).toFixed(1)}
                %
              </p>

              <p className="text-sm text-gray-500">
                Submitted on{" "}
                {new Date(
                  result.submittedAt
                ).toLocaleString()}
              </p>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default QuizResults;