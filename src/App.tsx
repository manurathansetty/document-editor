import { Sidebar } from "./Sidebar";
import Texteditor from "./Texteditor";
import Footer from "./Footer";
import { useState } from "react";

export default function App() {

  const [panelItems, setPanelItems] = useState([
    { id: 1, title: "Welcome to your first document" }
  ]);

  const [displayContent, setDisplayContent] = useState("");
  const [title, setCurrentTitle] = useState("");
  const addNewDocumentBox = (name: string) => {
    const newId = Date.now(); // unique ID
    setPanelItems([...panelItems, { id: newId, title: name || `Untitled` }]);
  };

  const updatePanelItems = (items: any) => {
    setPanelItems(items);
  };

  const selectedDocument = (content: any) => {
    console.log(content);
    setDisplayContent(content.id);
    setCurrentTitle(content.title);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Main Content (Sidebar + Editor) */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel */}
        <div className="w-1/4 p-0">
          <Sidebar panelItems={panelItems} selectedDocument={selectedDocument} />
        </div>

        {/* Right Editor Panel */}
        <div className="w-3/4 flex-1 bg-white dark:bg-black overflow-auto">
          <Texteditor addNewDocumentBox={addNewDocumentBox} displayContent={displayContent} currentTitle={title} />
        </div>
      </div>

      {/* Footer (Status Bar) */}
      <footer className="h-8 flex items-center justify-between px-4 bg-gray-200 dark:bg-gray-800">
        <Footer updatePanelItems={updatePanelItems} />
      </footer>
    </div>
  );
}
