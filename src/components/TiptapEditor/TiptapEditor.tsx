import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';

interface TiptapEditorProps {
  onEditorReady?: (editor: ReturnType<typeof useEditor>) => void;
}

const TiptapEditor = ({ onEditorReady }: TiptapEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6]
      })
    ],
    content: '<p>Hello World! 🌎️</p>',
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none h-full',
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
    const elementType = event.dataTransfer.getData('application/tiptap-element-type');
    if (!elementType) return;
    
    // Get the drop position
    const editorView = editor.view;
    const coordinates = editorView.posAtCoords({ left: event.clientX, top: event.clientY });
    
    if (!coordinates) return;
    
    // Set the cursor position to the drop position
    editor.chain().focus().setTextSelection(coordinates.pos).run();
    
    // Insert the content based on element type
    if (elementType === 'heading') {
      const levelStr = event.dataTransfer.getData('application/tiptap-heading-level');
      const level = parseInt(levelStr, 10) as 1 | 2 | 3 | 4 | 5 | 6;
      
      if (isNaN(level)) return;
      
      editor.chain().focus().insertContent({
        type: 'heading',
        attrs: { level },
        content: [{ type: 'text', text: `Heading ${level}` }]
      }).run();
    } else if (elementType === 'paragraph') {
      editor.chain().focus().insertContent({
        type: 'paragraph',
        content: [{ type: 'text', text: 'Text paragraph' }]
      }).run();
    }
  };

  // Function to handle drag over
  const handleDragOver = (event: React.DragEvent) => {
    // Check if the data being dragged is our custom type
    if (event.dataTransfer.types.includes('application/tiptap-element')) {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'copy';
    }
  };

  return (
    <div 
      className="tiptap-editor h-full flex flex-col cursor-text" 
      onClick={handleContainerClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <EditorContent editor={editor} className="flex-1 h-full" />
    </div>
  );
};

export default TiptapEditor;
