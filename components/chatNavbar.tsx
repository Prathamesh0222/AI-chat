"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChatSidebar } from "./chatSidebar";

export const ChatNavbar = () => {
  const session = useSession();
  return (
    <header className="fixed top-0 left-0 right-0 px-6 py-4 z-50 backdrop-blur-md">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <div className="fixed">
              <ChatSidebar />
            </div>
            <div className="ml-12">
              <Link href="/chat" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AI</span>
                </div>
                <span className="text-white font-semibold text-xl">
                  ChatFlow
                </span>
              </Link>
            </div>
          </div>
        </div>

        <Avatar>
          <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 font-semibold">
            {session.data?.user.username?.charAt(0).toUpperCase() || "?"}
          </AvatarFallback>
        </Avatar>
      </nav>
    </header>
  );
};
