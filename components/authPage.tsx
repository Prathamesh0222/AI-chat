"use client";

import { BackgroundPattern } from "./backgroundPattern";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "./ui/label";
import { Github } from "lucide-react";
import Link from "next/link";
import { GoogleIcon } from "@/app/icons/GoogleIcon";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export const AuthPage = ({ isSignIn }: { isSignIn: boolean }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const toastStyle = {
    style: {
      background: "rgba(30, 58, 138, 0.2)", // This matches bg-blue-900/20
      color: "#fff",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(8px)",
    },
  };

  const handleSubmit = async () => {
    if (
      !formData.email ||
      !formData.password ||
      (!isSignIn && !formData.username)
    ) {
      toast.error("Please fill in all fields", toastStyle);
      return;
    }
    setIsLoading(true);
    try {
      if (isSignIn) {
        const result = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });
        if (result?.error) {
          toast.error("Invalid credentials", toastStyle);
          return;
        }
        toast.success("Signed in successfully!", toastStyle);
        router.push("/chat");
      } else {
        const response = await axios.post("/api/register", formData);

        if (!response.data) {
          throw new Error("Something went wrong");
        }

        await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        toast.success("Account created successfully!.", toastStyle);
        router.push("/chat");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An error occurred",
        toastStyle
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "google" | "github") => {
    try {
      await signIn(provider, {
        callbackUrl: "/chat",
      });
    } catch (error) {
      toast.error(`Failed to sign in with ${provider}`, toastStyle);
    }
  };

  return (
    <div>
      <BackgroundPattern />
      <div className="flex flex-col justify-center h-screen relative">
        <div className="flex justify-center">
          <Card className="w-[500px] bg-blue-900/20">
            <CardHeader>
              <CardTitle className="flex justify-center text-xl">
                {isSignIn ? "Login" : "Register"}
              </CardTitle>
              <CardDescription className="flex justify-center text-sm">
                {isSignIn
                  ? "Great to see you again! Please enter your details."
                  : "Join us today! Enter your information below."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {!isSignIn && (
                  <>
                    <Label>Username</Label>
                    <Input
                      name="username"
                      placeholder="John Doe"
                      type="text"
                      value={formData.username}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setFormData({
                          ...formData,
                          [e.target.name]: e.target.value,
                        });
                      }}
                      disabled={isLoading}
                    />
                  </>
                )}

                <Label>Email</Label>
                <Input
                  name="email"
                  placeholder="test@example.com"
                  type="email"
                  value={formData.email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  disabled={isLoading}
                />
                <Label>Password</Label>
                <Input
                  name="password"
                  placeholder="*********"
                  type="password"
                  value={formData.password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    });
                  }}
                />
                <Button
                  className="w-full mt-3"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {isSignIn ? "Signing in..." : "Creating account..."}
                    </div>
                  ) : isSignIn ? (
                    "Sign In"
                  ) : (
                    "Create Account"
                  )}
                </Button>
                <div className="relative mt-3">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 text-white/70">OR</span>
                  </div>
                </div>
                <div className="flex w-full gap-2 justify-between mt-6">
                  <Button
                    onClick={() => handleSocialLogin("google")}
                    variant={"outline"}
                    className="w-[49%] items-center"
                    disabled={isLoading}
                  >
                    <GoogleIcon />
                    <span>Google</span>
                  </Button>
                  <Button
                    onClick={() => handleSocialLogin("github")}
                    variant={"outline"}
                    className="w-[49%] items-center"
                    disabled={isLoading}
                  >
                    <Github />
                    Github
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center text-sm">
              {isSignIn ? (
                <p>
                  Don't have an account?{" "}
                  <Link
                    href="/signup"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Sign up
                  </Link>
                </p>
              ) : (
                <p>
                  Already have an account?{" "}
                  <Link
                    href="/signin"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Sign in
                  </Link>
                </p>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};
