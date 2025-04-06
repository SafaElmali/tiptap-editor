import { Editor } from '@tiptap/react';
import { Level } from '@tiptap/extension-heading';
import { ComponentType } from 'react';
import { Heading1, Heading2, Heading3, Heading4, Heading5, Heading6 } from 'lucide-react';

// Define the types of draggable items
export interface DraggableItem {
  id: string;
  title: string;
  type: string;
  attrs?: Record<string, unknown>;
  defaultContent?: string;
  insertContent: (editor: Editor) => void;
  icon?: ComponentType<React.SVGProps<SVGSVGElement>>;
}

// Create a collection of draggable typography items
export const typographyItems: DraggableItem[] = [
  {
    id: 'heading-1',
    title: 'Heading 1',
    type: 'heading',
    attrs: { level: 1 as Level },
    defaultContent: 'Heading 1',
    icon: Heading1,
    insertContent: (editor: Editor) => {
      editor.chain()
        .focus()
        .insertContent({
          type: 'heading',
          attrs: { level: 1 },
          content: [{ type: 'text', text: 'Heading 1' }]
        })
        .run();
    }
  },
  {
    id: 'heading-2',
    title: 'Heading 2',
    type: 'heading',
    attrs: { level: 2 as Level },
    defaultContent: 'Heading 2',
    icon: Heading2,
    insertContent: (editor: Editor) => {
      editor.chain()
        .focus()
        .insertContent({
          type: 'heading',
          attrs: { level: 2 },
          content: [{ type: 'text', text: 'Heading 2' }]
        })
        .run();
    }
  },
  {
    id: 'heading-3',
    title: 'Heading 3',
    type: 'heading',
    attrs: { level: 3 as Level },
    defaultContent: 'Heading 3',
    icon: Heading3,
    insertContent: (editor: Editor) => {
      editor.chain()
        .focus()
        .insertContent({
          type: 'heading',
          attrs: { level: 3 },
          content: [{ type: 'text', text: 'Heading 3' }]
        })
        .run();
    }
  },
  {
    id: 'heading-4',
    title: 'Heading 4',
    type: 'heading',
    attrs: { level: 4 as Level },
    defaultContent: 'Heading 4',
    icon: Heading4,
    insertContent: (editor: Editor) => {
      editor.chain()
        .focus()
        .insertContent({
          type: 'heading',
          attrs: { level: 4 },
          content: [{ type: 'text', text: 'Heading 4' }]
        })
        .run();
    }
  },
  {
    id: 'heading-5',
    title: 'Heading 5',
    type: 'heading',
    attrs: { level: 5 as Level },
    defaultContent: 'Heading 5',
    icon: Heading5,
    insertContent: (editor: Editor) => {
      editor.chain()
        .focus()
        .insertContent({
          type: 'heading',
          attrs: { level: 5 },
          content: [{ type: 'text', text: 'Heading 5' }]
        })
        .run();
    }
  },
  {
    id: 'heading-6',
    title: 'Heading 6',
    type: 'heading',
    attrs: { level: 6 as Level },
    defaultContent: 'Heading 6',
    icon: Heading6,
    insertContent: (editor: Editor) => {
      editor.chain()
        .focus()
        .insertContent({
          type: 'heading',
          attrs: { level: 6 },
          content: [{ type: 'text', text: 'Heading 6' }]
        })
        .run();
    }
  }
];
