"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { BackgroundPattern } from "@/components/backgroundPattern";
import { ChatNavbar } from "@/components/chatNavbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, UserCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  content: string;
  role: "User" | "Bot";
  createdAt: string;
}

export default function ChatRoom() {
  const params = useParams();
  const chatId = params.chatId;
  const session = useSession();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchMessages = useCallback(async () => {
    try {
      const response = await axios.get(`/api/chats/${chatId}/messages`);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }, [chatId]);

  useEffect(() => {
    fetchMessages();
  }, [chatId, fetchMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      setLoading(true);
      const response = await axios.post(`/api/chats/${chatId}/message`, {
        content: input,
      });
      setMessages((prev) => [
        ...prev,
        response.data.userMessage,
        response.data.botMessage,
      ]);
      setInput("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  if (session.status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (session.status === "unauthenticated") {
    router.push("/auth/signin");
    return null;
  }

  return (
    <div className="bg-background">
      <BackgroundPattern />
      <ChatNavbar />
      <div className="pt-20">
        <div className="relative flex flex-col items-center justify-end min-h-screen p-4">
          <div className="relative z-10 flex flex-col items-center w-full">
            <div className="flex flex-col space-y-4 w-full max-w-3xl mx-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-2.5 w-full ${
                    message.role === "User" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`flex-shrink-0 ${
                      message.role === "User" ? "ml-2" : "mr-2"
                    }`}
                  >
                    {message.role === "User" ? (
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                        <UserCircle className="w-6 h-6 text-white" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                        <Bot className="w-6 h-6 text-white" />
                      </div>
                    )}
                  </div>

                  <div
                    className={`flex flex-col ${
                      message.role === "User" ? "items-end" : "items-start"
                    } max-w-[70%]`}
                  >
                    <div
                      className={`w-full px-4 py-2 rounded-lg break-words ${
                        message.role === "User"
                          ? "bg-blue-600 text-white rounded-br-none"
                          : "bg-gray-900 text-white rounded-bl-none"
                      }`}
                    >
                      <div>
                        <ReactMarkdown
                          components={{
                            //@ts-expect-error - ReactMarkdown types are incomplete
                            code({ inline, children, ...props }) {
                              return (
                                <code
                                  className={`${
                                    inline
                                      ? "bg-gray-800 rounded px-1 py-0.5"
                                      : "block bg-gray-800 rounded-md p-4 overflow-x-auto text-sm"
                                  }`}
                                  {...props}
                                >
                                  {children}
                                </code>
                              );
                            },
                            pre({ children }) {
                              return (
                                <pre className="overflow-x-auto w-full my-2">
                                  {children}
                                </pre>
                              );
                            },
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">
                      {new Date(message.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={sendMessage} className="w-full max-w-3xl mx-auto">
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
    </div>
  );
}
