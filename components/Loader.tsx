import { BackgroundPattern } from "./backgroundPattern";

export const Loader = () => {
  return (
    <div>
      <BackgroundPattern />
      <div className="flex flex-col justify-center items-center h-screen animate-pulse duration-300">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-xl">AI</span>
        </div>
      </div>
    </div>
  );
};
