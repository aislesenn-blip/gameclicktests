import AdUnit from "@/components/AdUnit";
import ClickGame from "@/components/ClickGame";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-neon-green flex flex-col lg:flex-row gap-8 p-4 md:p-8 justify-center">

      {/* Left Sidebar Ad (Desktop) */}
      <aside className="hidden lg:flex flex-col gap-4 w-64 flex-shrink-0 items-center pt-20">
        <AdUnit size="sidebar" />
      </aside>

      <div className="flex-1 flex flex-col items-center gap-8 w-full max-w-4xl">
        {/* Top Ad */}
        <div className="w-full">
            <AdUnit size="responsive" />
        </div>

        {/* Game Area */}
        <ClickGame />

        {/* Bottom Ad */}
        <div className="w-full">
            <AdUnit size="responsive" />
        </div>
      </div>

      {/* Right Sidebar Ad (Desktop) - Optional for balance */}
      <aside className="hidden xl:flex flex-col gap-4 w-64 flex-shrink-0 items-center pt-20">
         <AdUnit size="sidebar" />
      </aside>
    </main>
  );
}