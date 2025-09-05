import { Sidebar } from "./Sidebar";
import Texteditor from "./Texteditor";
import Footer from "./Footer";

export default function App() {
  return (
    <div className="flex flex-col h-screen">
      {/* Main Content (Sidebar + Editor) */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel */}
        <div className="w-1/4 p-0">
          <Sidebar />
        </div>

        {/* Right Editor Panel */}
        <div className="w-3/4 flex-1 bg-white dark:bg-black overflow-auto">
          <Texteditor />
        </div>
      </div>

      {/* Footer (Status Bar) */}
      <footer className="h-8 flex items-center justify-between px-4 bg-gray-200 dark:bg-gray-800">
        <Footer />
      </footer>
    </div>
  );
}
