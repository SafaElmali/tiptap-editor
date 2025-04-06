import { Editor } from '@tiptap/react';
import { typographyItems } from './types';

// Function to handle drop of a draggable item
export const handleItemDrop = (
  event: React.DragEvent,
  editor: Editor | null
): void => {
  if (!editor) return;
  
  event.preventDefault();
  
  // Get the element type from the drag data
  const itemId = event.dataTransfer.getData('application/tiptap-element');
  if (!itemId) return;
  
  // Find the item in our collection
  const item = typographyItems.find(item => item.id === itemId);
  if (!item) return;
  
  // Get the drop position
  const editorView = editor.view;
  const coordinates = editorView.posAtCoords({ left: event.clientX, top: event.clientY });
  
  if (!coordinates) return;
  
  // Set the cursor position to the drop position
  editor.chain().focus().setTextSelection(coordinates.pos).run();
  
  // Insert the content
  item.insertContent(editor);
};
