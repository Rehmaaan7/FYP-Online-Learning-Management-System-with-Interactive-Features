import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateSystemAnnouncementMutation,
  useDeleteSystemAnnouncementMutation,
  useGetSystemAnnouncementsQuery,
} from "@/features/api/adminApi";
import { Trash2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const SystemAnnouncements = () => {


  const { data, refetch } = useGetSystemAnnouncementsQuery();
  const [createSystemAnnouncement, { isLoading: creating }] =
    useCreateSystemAnnouncementMutation();
  const [deleteSystemAnnouncement] = useDeleteSystemAnnouncementMutation();

  const [message, setMessage] = useState("");

  const announcements = data?.announcements || [];

  const createHandler = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    await createSystemAnnouncement(message);
    toast.success("system announcement posted");
    setMessage("");
    refetch();
  };

  const deleteHandler = async (announcementId) => {

    toast("Are you sure you want to delete this AnnouncementId ?", {
          action: {
            label: "Delete",
            onClick: async () => {
             await deleteSystemAnnouncement(announcementId);
              refetch();
              toast.success("announcement deleted");
            },
          },
        });
  };

  return (
    <div className="mt-20 space-y-6">
      <h1 className="text-2xl font-bold">System Announcements</h1>
      <p className="text-sm text-gray-500">
        These are visible to every user on the platform, regardless of course enrollment.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Post System-Wide Announcement</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={createHandler} className="space-y-3">
            <Textarea
              placeholder="Announcement message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
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
              <Button
                variant="destructive"
                size="icon"
                onClick={() => deleteHandler(announcement._id)}
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

export default SystemAnnouncements;
