export default function SplashScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-black text-center">
      <p className="absolute top-6 text-gray-400 text-sm">
        Logging you into
      </p>

      <h1 className="text-6xl font-extrabold tracking-widest text-gray-300">
        FALCON FEEDS
      </h1>

      <p className="mt-4 text-gray-400 text-lg font-mono">
        Cyber Threat Intelligence Platform
      </p>
    </div>
  );
}
