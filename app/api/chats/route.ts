import { authOptions } from "@/app/config/auth.config";
import { GoogleGenAI } from "@google/genai";
import { prisma } from "@/app/singleton/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateChatTitle(content: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Generate a very concise title (3-4 words max) that captures the main topic of this conversation. Title should be clear and descriptive.

Input message: "${content}"

Return only the title, nothing else.`,
  });
  if (!response.text) {
    return "New Chat";
  }

  return response.text.trim();
}

export const POST = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const content = body.content || "New Chat";
    const userId = session.user.id;

    const title = await generateChatTitle(content);

    const newChat = await prisma.chat.create({
      data: {
        userId,
        title: title || "New Chat",
      },
    });

    return NextResponse.json(newChat);
  } catch (error) {
    console.error("Error creating chat:", error);
    return NextResponse.json(
      { error: "Failed to create chat" },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;

  const chats = await prisma.chat.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
  });

  return NextResponse.json(chats);
};
