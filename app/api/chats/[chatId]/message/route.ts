import { authOptions } from "@/app/config/auth.config";
import { getAIResponse } from "@/app/service/ai/gemini";
import { prisma } from "@/app/singleton/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  { params }: { params: { chatId: string } }
) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;
    const chatId = params.chatId;
    if (!chatId) {
      return NextResponse.json(
        { error: "Chat ID is required" },
        { status: 400 }
      );
    }

    const { content } = await req.json();

    const chat = await prisma.chat.findFirst({
      where: {
        id: chatId,
        userId,
      },
    });

    if (!chat) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 });
    }

    const userMessage = await prisma.message.create({
      data: {
        chatId: chat.id,
        role: "User",
        content,
      },
    });

    const aiResponse = await getAIResponse({ prompt: content });

    if (!aiResponse) {
      return NextResponse.json(
        { error: "Failed to get AI response" },
        { status: 500 }
      );
    }

    const botMessage = await prisma.message.create({
      data: {
        chatId: chat.id,
        role: "Bot",
        content: aiResponse,
      },
    });

    return NextResponse.json({
      userMessage,
      botMessage,
    });
  } catch (error) {
    console.error("Error while AI response", error);
  }
};
