"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChatSidebar } from "./chatSidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, SquarePen } from "lucide-react";
import { useRouter } from "next/navigation";

export const ChatNavbar = () => {
  const router = useRouter();
  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/signin",
      redirect: true,
    });
  };

  const startNewChat = () => {
    router.push("/chat");
  };

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
        <div className="flex gap-5 items-center">
          <SquarePen
            onClick={startNewChat}
            className="w-4.5 h-4.5 text-muted-foreground cursor-pointer hover:text-white"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer hover:opacity-80">
                <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 font-semibold">
                  {session.data?.user.username?.charAt(0).toUpperCase() ||
                    session.data?.user.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                {session.data?.user.username || session.data?.user.name}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Coming Soon...</DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600"
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
};
