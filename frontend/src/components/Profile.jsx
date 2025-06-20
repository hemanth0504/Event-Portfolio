import React from "react";
import { useUserStore } from "../stores/useUserStore";
import { UserIcon, MailIcon } from "lucide-react";

export default function Profile() {
  const { user } = useUserStore();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600 text-lg">No user data found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-md rounded-lg p-8">
        <div className="flex items-center space-x-6 mb-6">
          <img
            className="w-20 h-20 rounded-full object-cover border"
            src={user.imageUrl || `https://ui-avatars.com/api/?name=${user.name || "User"}`}
            alt="Profile"
          />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
            <p className="text-sm text-gray-500">User ID: {user._id}</p>
          </div>
        </div>

        <div className="space-y-4 text-gray-700">
          <div className="flex items-center gap-2">
            <UserIcon className="w-5 h-5 text-gray-500" />
            <span>{user.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <MailIcon className="w-5 h-5 text-gray-500" />
            <span>{user.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
