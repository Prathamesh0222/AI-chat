import { NextRequest, NextResponse } from "next/server";
import { ZodType } from "zod";

export const validateSchema = async (schema: ZodType) => {
  return async (req: NextRequest) => {
    try {
      const body = await req.json();
      const result = schema.safeParse(body);
      if (!result.success) {
        return NextResponse.json(
          {
            error: "Validation failed",
            details: result.error.errors,
          },
          { status: 400 }
        );
      }

      return NextResponse.next();
    } catch (error) {
      return NextResponse.json(
        { error: "Validation failed", details: error },
        { status: 400 }
      );
    }
  };
};
