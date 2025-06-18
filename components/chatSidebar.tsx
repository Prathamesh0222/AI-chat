"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { MessageSquare, ChevronLeft, Sidebar } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

interface Chat {
  id: string;
  title: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export const ChatSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const fetchChats = async () => {
    try {
      const response = await axios.get("/api/chats");
      setChats(response.data);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };
  useEffect(() => {
    fetchChats();
  }, []);

  const handleChatClick = (chatId: string) => {
    router.push(`/chat/${chatId}`);
  };

  return (
    <>
      <div
        ref={sidebarRef}
        className={cn(
          "fixed top-0 left-0 h-screen w-64 z-[100]",
          "bg-gray-900 text-gray-300",
          "transition-all duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {isOpen && (
            <div className="p-4 flex items-center justify-between border-b border-gray-700">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-800 rounded-lg cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-2">
            <div className="text-xs font-medium text-gray-500 px-3 py-2">
              Chats
            </div>
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => handleChatClick(chat.id)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 cursor-pointer text-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span className="truncate">{chat.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {!isOpen && (
        <Button
          className="p-1 hover:bg-gray-800 rounded-lg cursor-pointer"
          variant={"ghost"}
          onClick={() => setIsOpen(true)}
        >
          <Sidebar className="w-4.5 h-4.5" />
        </Button>
      )}
    </>
  );
};
