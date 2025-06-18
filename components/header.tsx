import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="relative z-50 px-6 py-4">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">AI</span>
          </div>
          <span className="text-white font-semibold text-xl">ChatFlow</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link href="/signin">
            <Button
              variant="outline"
              className="text-gray-300 hover:text-white cursor-pointer duration-300 transition-colors"
            >
              Sign in
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white cursor-pointer duration-300 transition-colors">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
};
