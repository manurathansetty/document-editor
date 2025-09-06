import { useEffect, useState } from "react"
import ToggleButton from "./ToggleButton"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Bold, Italic, Heading1, Heading2 } from "lucide-react"
import Placeholder from "@tiptap/extension-placeholder"
import { saveDocument } from "./fetch-functions/documentHandling"
import { toast } from "react-toastify"

export default function Texteditor() {
    const [isDark, setIsDark] = useState(
        document.documentElement.classList.contains("dark")
    )
    const [activeHeading, setActiveHeading] = useState<number | null>(null)
    const [isBoldActive, setIsBoldActive] = useState(false)
    const [isItalicActive, setIsItalicActive] = useState(false)
    const [documentName, setDocumentName] = useState("")
    const [showPopup, setShowPopup] = useState(false)


    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: "Start typing...",
            }),
        ],
        content: "",
        autofocus: true,
        onUpdate: () => {
            // Update toolbar buttons based on current selection
            if (!editor) return

            setIsBoldActive(editor.isActive("bold"))
            setIsItalicActive(editor.isActive("italic"))

            if (editor.isActive("heading", { level: 1 })) setActiveHeading(1)
            else if (editor.isActive("heading", { level: 2 })) setActiveHeading(2)
            else setActiveHeading(null)
            useEffect(() => {
                if (!editor) return

                const updateToolbar = () => {
                    setIsBoldActive(editor.isActive("bold"))
                    setIsItalicActive(editor.isActive("italic"))

                    if (editor.isActive("heading", { level: 1 })) setActiveHeading(1)
                    else if (editor.isActive("heading", { level: 2 })) setActiveHeading(2)
                    else setActiveHeading(null)
                }

                editor.on("selectionUpdate", updateToolbar)
                editor.on("transaction", updateToolbar) // also catch formatting changes

                return () => {
                    editor.off("selectionUpdate", updateToolbar)
                    editor.off("transaction", updateToolbar)
                }
            }, [editor])
        },
    })

    if (!editor) return null

    const toggleHeading = (level: 1 | 2) => {
        editor.chain().focus().toggleHeading({ level }).run()
        setActiveHeading(activeHeading === level ? null : level)
    }

    const toggleBold = () => {
        editor.chain().focus().toggleBold().run()
        setIsBoldActive(!isBoldActive)
    }

    const toggleItalic = () => {
        editor.chain().focus().toggleItalic().run()
        setIsItalicActive(!isItalicActive)
    }

    function onSave(): void {
        const username = sessionStorage.getItem("name")
        console.log("username", username);

        if (documentName === "") {
            toast.info("Please enter a document name")
            setShowPopup(true)
            return
        } else {
            setShowPopup(false)
        }

        if (username === null) {
            toast.error("Please sign in to save your document")
        }
    }

    function handleSubmit() {
        setShowPopup(false)
        const username = sessionStorage.getItem("name")
        saveDocument(editor.getHTML(), username as string, documentName).then((res) => {
            if (res.success) {
                toast.success("Document saved successfully")
            } else {
                toast.error("Failed to save document")
            }
        })
    }

    return (
        <div className="w-full h-full p-4">
            {/* Header */}
            <div className="flex items-center justify-center mb-6">
                <h1 className="relative left-1/2 transform -translate-x-1/2 text-3xl font-extrabold text-black dark:text-gray-300">
                    My Document Editor
                </h1>
                <div className="ml-auto flex flex-row gap-2 text-2xl">
                    <ToggleButton />
                    {isDark ? "🌙" : "☀️"}
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex flex-row gap-2 mb-4 border rounded-lg p-2 bg-gray-100 dark:bg-gray-800">
                {/* Bold */}
                <button
                    onClick={toggleBold}
                    className={`p-2 rounded-lg transition ${isBoldActive
                        ? "bg-purple-600 text-white"
                        : "hover:bg-purple-200 dark:hover:bg-purple-700"
                        }`}
                >
                    <Bold size={18} />
                </button>

                {/* Italic */}
                <button
                    onClick={toggleItalic}
                    className={`p-2 rounded-lg transition ${isItalicActive
                        ? "bg-purple-600 text-white"
                        : "hover:bg-purple-200 dark:hover:bg-purple-700"
                        }`}
                >
                    <Italic size={18} />
                </button>

                {/* Heading 1 */}
                <button
                    onClick={() => toggleHeading(1)}
                    className={`p-2 rounded-lg transition ${activeHeading === 1
                        ? "bg-purple-600 text-white"
                        : "hover:bg-purple-200 dark:hover:bg-purple-700"
                        }`}
                >
                    <Heading1 size={18} />
                </button>

                {/* Heading 2 */}
                <button
                    onClick={() => toggleHeading(2)}
                    className={`p-2 rounded-lg transition ${activeHeading === 2
                        ? "bg-purple-600 text-white"
                        : "hover:bg-purple-200 dark:hover:bg-purple-700"
                        }`}
                >
                    <Heading2 size={18} />
                </button>
            </div>

            {/* Editor */}
            <EditorContent
                editor={editor}
                className="editor border rounded-md bg-white dark:bg-black text-black dark:text-white min-h-[70vh] p-3 font-mono text-base leading-6"
            />

            {/* Action Buttons */}
            <div className="flex flex-row gap-3 mt-4">
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition" onClick={() => onSave()}>
                    Save Document
                </button>
                <button className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                    New Document
                </button>
                {/* <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                    AI Mode
                </button> */}
            </div>


            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 dark:bg-black/50">
                    <div className="popup-base">
                        <h2 className="text-lg font-bold mb-4 text-center text-black dark:text-white">
                            Enter Document Name
                        </h2>
                        <input
                            type="text"
                            placeholder="Document Name"
                            className="input"
                            onChange={(e) => setDocumentName(e.target.value)}
                        />
                        <button
                            className="px-3 py-1 bg-purple-600 text-white rounded"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            )
            }
        </div >
    )
}
