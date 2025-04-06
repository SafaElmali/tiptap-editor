import { useEffect } from "react";
import { useEditor as useTiptapEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { motion } from "framer-motion";
import LeftPanel from "./layouts/LeftPanel";
import RightPanel from "./layouts/RightPanel";
import EditorArea from "./layouts/EditorArea";
import { containerVariants } from "./layouts/animations";
import { EditorProvider } from "./context/EditorContext";
import Heading from "./extensions/Heading";
import "./styles/editor.css";

interface TiptapEditorProps {
  onEditorReady?: (editor: ReturnType<typeof useTiptapEditor>) => void;
}

const TiptapEditor = ({ onEditorReady }: TiptapEditorProps) => {
  const editor = useTiptapEditor({
    extensions: [
      StarterKit.configure({
        // Disable the default heading extension from StarterKit
        heading: false,
      }),
      // Use our React-based heading extension instead
      Heading,
    ],
    content: "<p>Hello World! 🌎️</p>",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none h-full",
      },
    },
    onUpdate: ({ editor }) => {
      // Handle content updates here
      console.log(editor.getHTML());
    },
    onTransaction: () => {
      // Force re-render
      setTimeout(() => {
        if (editor) {
          editor.commands.focus();
        }
      }, 0);
    },
  });

  // Call onEditorReady when the editor is available
  useEffect(() => {
    if (editor && onEditorReady) {
      onEditorReady(editor);
    }
  }, [editor, onEditorReady]);

  // Function to focus the editor when clicking anywhere in the container
  const handleContainerClick = () => {
    if (editor && !editor.isDestroyed) {
      editor.commands.focus();
    }
  };

  // Function to handle drop events
  const handleDrop = (event: React.DragEvent) => {
    if (!editor) return;
    event.preventDefault();

    // Get the element type and heading level from the drag data
    const elementType = event.dataTransfer.getData(
      "application/tiptap-element-type"
    );
    if (!elementType) return;

    // Get the drop position
    const editorView = editor.view;
    const coordinates = editorView.posAtCoords({
      left: event.clientX,
      top: event.clientY,
    });

    if (!coordinates) return;

    // Set the cursor position to the drop position
    editor.chain().focus().setTextSelection(coordinates.pos).run();

    // Insert the content based on element type
    if (elementType === "heading") {
      const levelStr = event.dataTransfer.getData(
        "application/tiptap-heading-level"
      );
      const level = parseInt(levelStr, 10) as 1 | 2 | 3 | 4 | 5 | 6;

      if (isNaN(level)) return;

      editor
        .chain()
        .focus()
        .insertContent({
          type: "heading",
          attrs: { level },
          content: [{ type: "text", text: `Heading ${level}` }],
        })
        .run();
    } else if (elementType === "paragraph") {
      editor
        .chain()
        .focus()
        .insertContent({
          type: "paragraph",
          content: [{ type: "text", text: "Text paragraph" }],
        })
        .run();
    }
  };

  // Function to handle drag over
  const handleDragOver = (event: React.DragEvent) => {
    // Check if the data being dragged is our custom type
    if (event.dataTransfer.types.includes("application/tiptap-element")) {
      event.preventDefault();
      event.dataTransfer.dropEffect = "copy";
    }
  };

  return (
    <EditorProvider editor={editor}>
      <motion.div
        className="tiptap-editor-container h-full flex"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Left Panel */}
        <motion.div className="w-64 border-r border-gray-200 overflow-y-auto">
          <LeftPanel />
        </motion.div>
        
        {/* Editor Area */}
        <motion.div className="flex-1 flex flex-col">
          <EditorArea
            handleContainerClick={handleContainerClick}
            handleDrop={handleDrop}
            handleDragOver={handleDragOver}
          />
        </motion.div>
        
        {/* Right Panel */}
        <motion.div className="w-64 border-l border-gray-200 p-4 overflow-y-auto">
          <RightPanel />
        </motion.div>
      </motion.div>
    </EditorProvider>
  );
};

export default TiptapEditor;
