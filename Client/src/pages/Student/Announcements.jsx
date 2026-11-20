import EmptyAnnouncements from "@/components/EmptyAnnouncements";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetAnnouncementsQuery } from "@/features/api/announcementApi";
import { Megaphone } from "lucide-react";
import React from "react";
import { useParams } from "react-router-dom";

const Announcements = () => {
  const { courseId } = useParams();
  const { data, isLoading } = useGetAnnouncementsQuery(courseId);

  const announcements = data?.announcements || [];

  if (isLoading) {
    return <h1 className="mt-20">Loading...</h1>;
  }

  return (
    <div className="mt-20 mx-6 md:mx-20 space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
        <Megaphone size={28} />
        Announcements
      </h1>

      {announcements.length === 0 ? (
       <EmptyAnnouncements />
      ) : (
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <Card key={announcement._id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-base">
                  {announcement.createdBy?.name}
                  {announcement.isGlobal && <Badge>System-wide</Badge>}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{announcement.message}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(announcement.createdAt).toLocaleString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Announcements;
