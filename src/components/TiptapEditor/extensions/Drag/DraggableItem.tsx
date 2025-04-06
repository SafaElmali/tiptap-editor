import { Editor } from '@tiptap/react';
import { DraggableItem } from './types';
import { Level } from '@tiptap/extension-heading';

// Component for a single draggable item
interface DraggableItemProps {
  item: DraggableItem;
  editor: Editor | null;
  isActive?: boolean;
}

const DraggableItemComponent = ({ item, editor, isActive = false }: DraggableItemProps) => {
  // Function to handle click on the item
  const handleClick = () => {
    if (!editor) return;
    
    if (item.type === 'heading') {
      editor.chain().focus().toggleHeading({ level: (item.attrs?.level as Level) || 1 }).run();
    } else {
      item.insertContent(editor);
    }
  };

  // Function to handle drag start
  const handleDragStart = (event: React.DragEvent) => {
    event.dataTransfer.setData('application/tiptap-element', item.id);
    event.dataTransfer.effectAllowed = 'copy';
  };

  const Icon = item.icon;

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onClick={handleClick}
      className={`w-full text-left px-3 py-2 rounded hover:bg-gray-200 transition-colors cursor-grab active:cursor-grabbing ${
        isActive ? 'bg-gray-200 font-semibold' : ''
      }`}
    >
      <div className="flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4" />}
        <span>{item.title}</span>
      </div>
    </div>
  );
};

export default DraggableItemComponent;
