import { Editor } from '@tiptap/react';
import { Level } from '@tiptap/extension-heading';

// Function to apply text style
export const applyTextStyle = (editor: Editor | null) => {
  if (!editor) return;
  editor.chain().focus().setParagraph().run();
};

// Function to apply heading
export const applyHeading = (editor: Editor | null, level: Level) => {
  if (!editor) return;
  editor.chain().focus().toggleHeading({ level }).run();
};

// Function to handle drag start
export const handleDragStart = (event: React.DragEvent, elementType: string, level?: Level) => {
  event.dataTransfer.setData('application/tiptap-element-type', elementType);
  if (level) {
    event.dataTransfer.setData('application/tiptap-heading-level', level.toString());
  }
  event.dataTransfer.effectAllowed = 'copy';
};
