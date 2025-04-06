import { Editor } from '@tiptap/react';
import TypographyItems from '../extensions/typography/TypographyItems';

interface LeftPanelProps {
  editor: Editor | null;
}

const LeftPanel = ({ editor }: LeftPanelProps) => {
  return (
    <div className="left-panel">
      <TypographyItems editor={editor} />
    </div>
  );
};

export default LeftPanel;
