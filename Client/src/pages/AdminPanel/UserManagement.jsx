import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserRoleMutation,
} from "@/features/api/adminApi";
import { Trash2, UserPlus } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const UserManagement = () => {
  const { data, refetch } = useGetUsersQuery();
  const [updateUserRole] = useUpdateUserRoleMutation();
  const [deleteUser] = useDeleteUserMutation();


  const users = data?.users || [];


  const roleChangeHandler = async (userId, newRole) => {
    await updateUserRole({ userId, role: newRole });
    toast.success("role updated");
    refetch();
  };

  const deleteHandler = async (userId) => {
    toast("Are you sure you want to delete this User ?", {
      action: {
        label: "Delete",
        onClick: async () => {
          await deleteUser(userId);
          refetch();
          toast.success("user deleted");
        },
      },
    });
  };

  return (
    <div className="mt-20 space-y-6">
      <h1 className="text-2xl font-bold">User Management</h1>

    

      <div className="space-y-3">
        {users.map((user) => (
          <Card key={user._id}>
            <CardContent className="flex items-center justify-between py-4 gap-4">
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline">{user.role}</Badge>
                <Select
                  value={user.role}
                  onValueChange={(newRole) =>
                    roleChangeHandler(user._id, newRole)
                  }
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="instructor">Instructor</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => deleteHandler(user._id)}
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

export default UserManagement;
