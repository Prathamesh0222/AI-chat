"use client";

import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BackgroundPattern } from "@/components/backgroundPattern";
import { ChatNavbar } from "@/components/chatNavbar";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function Chat() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const session = useSession();

  if (session.status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (session.status === "unauthenticated") {
    router.push("/signin");
    return null;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    try {
      setLoading(true);
      const chatResponse = await axios.post("/api/chats", {
        content: input,
      });
      const chatId = chatResponse.data.id;

      await axios.post(`/api/chats/${chatId}/message`, {
        content: input,
      });

      router.push(`/chat/${chatId}`);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <BackgroundPattern />
      <ChatNavbar />
      <div className="relative flex flex-col items-center justify-center min-h-screen p-4 pb-28">
        <div className="relative z-10 flex flex-col items-center w-full">
          <h1 className="text-3xl font-semibold mb-8">What can I help with?</h1>

          <form onSubmit={handleSubmit} className="w-full max-w-2xl">
            <div className="relative rounded-2xl shadow-lg items-center">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything"
                className="w-full p-8 pr-18 rounded-2xl focus:ring-blue-500 resize-none ring-2 ring-blue-500/20"
                disabled={loading}
              />

              <div className="absolute bottom-3.5 right-3 flex items-center justify-between">
                <Button
                  type="submit"
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5 rotate-90 transform"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 19V5M5 12l7-7 7 7" />
                    </svg>
                  )}
                </Button>
              </div>
            </div>
          </form>

          <div className="mt-4 text-center text-sm text-gray-500">
            <p>AI can make mistakes. Please double-check responses.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
