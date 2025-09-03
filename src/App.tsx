import { Sidebar } from "./Sidebar";
import Texteditor from "./Texteditor";

export default function App() {
  return (
    <div className="flex h-screen">
      {/* Left Panel */}
      <div className="w-1/4 p-0">
        <Sidebar />
      </div>

      {/* Right Editor Panel */}
      <div className="w-3/4 flex-1 bg-white dark:bg-black">
        <Texteditor />
      </div>
    </div>
  );
}
