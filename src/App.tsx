import { Sidebar } from "./Sidebar";
import Texteditor from "./Texteditor";
import Footer from "./Footer";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // hamburger + close icons

export default function App() {
  const [panelItems, setPanelItems] = useState([
    { id: 1, title: "Welcome to your first document" }
  ]);

  const [displayContent, setDisplayContent] = useState("");
  const [title, setCurrentTitle] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const addNewDocumentBox = (name: string) => {
    const newId = Date.now();
    setPanelItems([...panelItems, { id: newId, title: name || `Untitled` }]);
  };

  const updatePanelItems = (items: any) => {
    setPanelItems(items);
  };

  const selectedDocument = (content: any) => {
    setDisplayContent(content.id);
    setCurrentTitle(content.title);
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex flex-col h-screen relative">
      {/* Floating Hamburger / Close Button */}
      <button
        className="absolute top-2 left-2 z-50 p-2 bg-transparent rounded-md md:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X className="w-6 h-6 mt-4 text-gray-800 dark:text-gray-200" /> : <Menu className="w-6 h-6 mt-4 text-gray-800 dark:text-gray-200" />}
      </button>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar Drawer */}
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out z-40
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:static md:translate-x-0 md:w-1/4`}
        >
          <Sidebar panelItems={panelItems} selectedDocument={selectedDocument} />
        </div>

        {/* Right Editor */}
        <div className="flex-1 bg-white dark:bg-black overflow-auto md:w-3/4">
          <Texteditor
            addNewDocumentBox={addNewDocumentBox}
            displayContent={displayContent}
            currentTitle={title}
            panelItems={panelItems}
            updatePanelItems={updatePanelItems}
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="h-8 flex items-center justify-between px-4 bg-gray-200 dark:bg-gray-800">
        <Footer updatePanelItems={updatePanelItems} />
      </footer>
    </div>
  );
}
