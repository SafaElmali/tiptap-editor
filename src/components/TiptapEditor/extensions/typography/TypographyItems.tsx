import React from 'react';
import { Editor } from '@tiptap/react';
import { Type, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6 } from 'lucide-react';
import TypographyItem from './TypographyItem';
import { applyTextStyle, applyHeading, handleDragStart } from './utils';

interface TypographyItemsProps {
  editor: Editor | null;
}

const TypographyItems: React.FC<TypographyItemsProps> = ({ editor }) => {
  return (
    <>
      <h2 className="text-lg font-medium mb-4">Text</h2>
      
      <div className="typography-controls grid grid-cols-3 gap-2 mb-6">
        {/* Text (Paragraph) */}
        <TypographyItem
          icon={<Type size={22} />}
          label="Text"
          onDragStart={(e) => handleDragStart(e, 'paragraph')}
          onClick={() => applyTextStyle(editor)}
        />

        {/* Heading 1 */}
        <TypographyItem
          icon={<Heading1 size={22} />}
          label="Head 1"
          onDragStart={(e) => handleDragStart(e, 'heading', 1)}
          onClick={() => applyHeading(editor, 1)}
        />

        {/* Heading 2 */}
        <TypographyItem
          icon={<Heading2 size={22} />}
          label="Head 2"
          onDragStart={(e) => handleDragStart(e, 'heading', 2)}
          onClick={() => applyHeading(editor, 2)}
        />

        {/* Heading 3 */}
        <TypographyItem
          icon={<Heading3 size={22} />}
          label="Head 3"
          onDragStart={(e) => handleDragStart(e, 'heading', 3)}
          onClick={() => applyHeading(editor, 3)}
        />

        {/* Heading 4 */}
        <TypographyItem
          icon={<Heading4 size={22} />}
          label="Head 4"
          onDragStart={(e) => handleDragStart(e, 'heading', 4)}
          onClick={() => applyHeading(editor, 4)}
        />

        {/* Heading 5 */}
        <TypographyItem
          icon={<Heading5 size={22} />}
          label="Head 5"
          onDragStart={(e) => handleDragStart(e, 'heading', 5)}
          onClick={() => applyHeading(editor, 5)}
        />

        {/* Heading 6 */}
        <TypographyItem
          icon={<Heading6 size={22} />}
          label="Head 6"
          onDragStart={(e) => handleDragStart(e, 'heading', 6)}
          onClick={() => applyHeading(editor, 6)}
        />
      </div>
    </>
  );
};

export default TypographyItems;
