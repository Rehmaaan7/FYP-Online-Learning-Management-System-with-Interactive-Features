import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateAnnouncementMutation,
  useDeleteAnnouncementMutation,
  useGetAnnouncementsQuery,
} from "@/features/api/announcementApi";
import { Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const ManageAnnouncements = () => {
  const { courseId } = useParams();
  const { data, refetch } = useGetAnnouncementsQuery(courseId);
  const [createAnnouncement, { isLoading: creating }] =
    useCreateAnnouncementMutation();
  const [deleteAnnouncement] = useDeleteAnnouncementMutation();

  const [message, setMessage] = useState("");
  const [isGlobal, setIsGlobal] = useState(false);

  const announcements = data?.announcements || [];

  const createHandler = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    await createAnnouncement({ courseId, message, isGlobal });
    toast.success("announcement posted");
    setMessage("");
    setIsGlobal(false);
    refetch();
  };

  const deleteHandler = async (id) => {
    toast("Are you sure you want to delete this Announcement?", {
      action: {
        label: "Delete",
        onClick: async () => {
          await deleteAnnouncement(id);
          refetch();
          toast.success("announcement deleted");
        },
      },
    });
  };

  return (
    <div className="mt-20 space-y-6">
      <h1 className="text-2xl font-bold">Manage Announcements</h1>

      <Card>
        <CardHeader>
          <CardTitle>Post Announcement</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={createHandler} className="space-y-3">
            <Textarea
              placeholder="Announcement message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="flex items-center gap-2">
              <Switch checked={isGlobal} onCheckedChange={setIsGlobal} />
              <span className="text-sm">
                System-wide (visible to all users)
              </span>
            </div>
            <Button type="submit" disabled={creating}>
              Post
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {announcements.map((announcement) => (
          <Card key={announcement._id}>
            <CardContent className="flex items-center justify-between py-4">
              <div>
                <p>{announcement.message}</p>
                <p className="text-xs text-gray-400">
                  {new Date(announcement.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {announcement.isGlobal && <Badge>System-wide</Badge>}
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => deleteHandler(announcement._id)}
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

export default ManageAnnouncements;
