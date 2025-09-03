import { useEffect, useState } from "react";
import ToggleButton from "./ToggleButton";

export default function Texteditor() {

    const [isDark, setIsDark] = useState(
        document.documentElement.classList.contains("dark")
    );

    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.classList.contains("dark"));
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        return () => observer.disconnect();
    }, []);


    return (
        <div className="w-full h-full p-4">
            {/* Header */}
            <div className="flex items-center justify-center mb-6">
                {/* Title centered absolutely */}
                <h1 className="relative left-1/2 transform -translate-x-1/2 text-3xl font-extrabold text-black dark:text-gray-300">
                    My Document Editor
                </h1>

                {/* Right side: toggle + icon */}
                <div className="ml-auto flex flex-row gap-2 text-2xl">
                    <ToggleButton />
                    {isDark ? "🌙" : "☀️"}
                </div>
            </div>
            {/* Toolbar */}
            <div className="flex flex-row gap-3 mb-4">
                <button className="px-4 py-2 border border-purple-200 text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700 rounded">
                    Bold
                </button>
                <button className="px-4 py-2 border border-purple-200 text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700 rounded">
                    Italic
                </button>
                <button className="px-4 py-2 border border-purple-200 text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700 rounded">
                    h1
                </button>
                <button className="px-4 py-2 border border-purple-200 text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700 rounded">
                    h2
                </button>
            </div>
            <div className="flex flex-row gap-3 mb-4">
                <button className="px-4 py-2 border border-purple-200 text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700 rounded">
                    Save Document
                </button>
                <button className="px-4 py-2 border border-purple-200 text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700 rounded">
                    New Document
                </button>
                <button className="px-4 py-2 border border-purple-200 text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700 rounded">
                    AI mode
                </button>
            </div>

            {/* Editor Area */}
            <textarea
                className="w-full h-[70vh] p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white resize-none"
                placeholder="Start typing..."
            ></textarea>
        </div>
    );
}
