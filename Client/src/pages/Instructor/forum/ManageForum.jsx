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
  useCreateForumMutation,
  useCreatePostMutation,
  useDeletePostMutation,
  useGetForumsQuery,
  useGetPostsQuery,
} from "@/features/api/forumApi";
import { Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const ManageForum = () => {
  const { courseId } = useParams();
  const { data: forumsData, refetch: refetchForums } =
    useGetForumsQuery(courseId);
  const [createForum] = useCreateForumMutation();
  const [title, setTitle] = useState("");

  const forum = forumsData?.courseForum?.[0];

  const { data: postsData, refetch: refetchPosts } = useGetPostsQuery(
    forum?._id,
    { skip: !forum?._id },
  );
  const [createPost] = useCreatePostMutation();
  const [deletePost] = useDeletePostMutation();
  const [message, setMessage] = useState("");

  const posts = postsData?.posts || [];

  const createForumHandler = async (e) => {
    e.preventDefault();
    if (!title) return;
    await createForum({ courseId, title });
    toast.success("forum created");
    setTitle("");
    refetchForums();
  };

  const postHandler = async (e) => {
    e.preventDefault();
    if (!message.trim() || !forum?._id) return;
    await createPost({ forumId: forum._id, message });
    setMessage("");
    refetchPosts();
  };

  // const deleteHandler = async (postId) => {
  //   await deletePost({ forumId: forum._id, postId });
  //   refetchPosts();
  // };

  const deleteHandler = (postId) => {
  toast("Are you sure you want to delete this post?", {
    action: {
      label: "Delete",
      onClick: async () => {
        await deletePost({ forumId: forum._id, postId });
        refetchPosts();
        toast.success("Post removed");
      },
    },
  });
};

  return (
    <div className="mt-20 space-y-6">
      <h1 className="text-2xl font-bold">Manage Forum</h1>

      {!forum ? (
        <Card>
          <CardHeader>
            <CardTitle>Create Forum</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={createForumHandler} className="flex gap-2">
              <Input
                placeholder="Forum title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Button type="submit">
                <Plus className="mr-2" size={16} />
                Create
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <>
          <h2 className="text-xl font-semibold">{forum?.title}</h2>
          <div className="space-y-3">
            {posts.map((post) => (
              <Card key={post?._id}>
                <CardContent className="flex items-center justify-between py-4">
                  <div>
                    <p className="font-medium">{post?.autherId?.name}</p>
                    <p>{post?.message}</p>
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => deleteHandler(post?._id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <form onSubmit={postHandler} className="space-y-3">
            <Textarea
              placeholder="Post as instructor..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button type="submit">Post</Button>
          </form>
        </>
      )}
    </div>
  );
};

export default ManageForum;
