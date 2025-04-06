
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const TiptapEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: '<p>Hello World! This is a basic Tiptap editor.</p>',
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none h-full',
      },
    },
  });

  // Function to focus the editor when clicking anywhere in the container
  const handleContainerClick = () => {
    if (editor && !editor.isDestroyed) {
      editor.commands.focus();
    }
  };

  return (
    <div 
      className="tiptap-editor h-full flex flex-col cursor-text" 
      onClick={handleContainerClick}
    >
      <EditorContent editor={editor} className="flex-1 h-full" />
    </div>
  );
};

export default TiptapEditor;
