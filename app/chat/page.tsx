"use client";
import { useSession } from "next-auth/react";

export default function Chat() {
  const session = useSession();
  return <div>{session.data?.user.email}</div>;
}
