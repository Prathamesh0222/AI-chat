import { prisma } from "@/app/singleton/prisma";
import { SignupSchema } from "@/app/validators/auth.validate";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

const postHandler = async (req: NextRequest) => {
  const body = await req.json();
  const parsedData = SignupSchema.safeParse(body);

  if (!parsedData.success) {
    return NextResponse.json(
      {
        error: "Validation input error",
        details: parsedData.error.issues,
      },
      {
        status: 411,
      }
    );
  }

  const { email, username, password } = parsedData.data;

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
      select: {
        id: true,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          error: "Email or username already taken",
        },
        {
          status: 409,
        }
      );
    }

    const hashedPassword = await hash(password, 12);

    await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        message: "User created successfully",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error while creating user", error);

    return NextResponse.json(
      {
        error: "An error occurred during registration",
      },
      {
        status: 500,
      }
    );
  }
};

export const POST = postHandler;
