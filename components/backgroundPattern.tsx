export const BackgroundPattern = () => {
  return (
    <div className="fixed inset-0 z-0">
      {/* Main dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>

      {/* Animated gradient orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>
    </div>
  );
};
