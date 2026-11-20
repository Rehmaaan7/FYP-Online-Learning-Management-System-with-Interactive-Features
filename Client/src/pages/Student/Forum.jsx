import EmptyPostsForum from "@/components/EmptyPostsForum";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreatePostMutation,
  useGetForumsQuery,
  useGetPostsQuery,
} from "@/features/api/forumApi";
import { MessageSquare, MessageSquareOff, Send } from "lucide-react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const Forum = () => {
  const { courseId } = useParams();
  const [message, setMessage] = useState("");

  const { data: forumsData, isLoading: forumsLoading } =
    useGetForumsQuery(courseId);
  const forum = forumsData?.courseForum?.[0];

 

if (!forum) {
  return <EmptyPostsForum />
}

  const { data: postsData, refetch } = useGetPostsQuery(forum?._id, {
    skip: !forum?._id,
  });
  const [createPost, { isLoading: posting }] = useCreatePostMutation();

  const posts = postsData?.posts || [];

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!message.trim() || !forum?._id) return;
    await createPost({ forumId: forum._id, message });
    setMessage("");
    refetch();
  };

  if (forumsLoading) {
    return <h1 className="mt-20">Loading...</h1>;
  }

  return (
    <div className="mt-20 mx-6 md:mx-20 space-y-6">
      <div className="flex items-center gap-3">
        <MessageSquare size={28} />
        <h1 className="text-2xl md:text-3xl font-bold">
          {forum?.title}
        </h1>
      </div>

      <div className="space-y-4">
        {posts?.length === 0 ? (
          <p className="text-gray-500">No posts yet. Be the first to ask a question.</p>
        ) : (
          posts.map((post) => (
            <Card key={post?._id}>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  {post?.autherId?.name}
                  {post?.autherId?.role === "instructor" && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                      Instructor
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{post?.message}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(post?.createdAt).toLocaleString()}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <form onSubmit={submitHandler} className="space-y-3">
        <Textarea
          placeholder="Write a reply or ask a question..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button type="submit" disabled={posting}>
          <Send className="mr-2" size={16} />
          Post
        </Button>
      </form>
    </div>
  );
};

export default Forum;
