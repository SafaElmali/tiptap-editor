import { Node as ProseMirrorNode } from 'prosemirror-model';
import { mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { Node } from '@tiptap/core';
import HeadingView from '../components/Heading/HeadingView';

export type Level = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingOptions {
  levels: Level[],
  HTMLAttributes: Record<string, string | number | boolean>,
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    heading: {
      /**
       * Set a heading node
       */
      setHeading: (attributes: { level: Level }) => ReturnType,
      /**
       * Toggle a heading node
       */
      toggleHeading: (attributes: { level: Level }) => ReturnType,
    }
  }
}

type CommandProps = {
  commands: Record<string, (...args: any[]) => boolean>
};

const Heading = Node.create<HeadingOptions>({
  name: 'heading',

  addOptions() {
    return {
      levels: [1, 2, 3, 4, 5, 6],
      HTMLAttributes: {
        class: 'heading',
      },
    }
  },

  addAttributes() {
    return {
      level: {
        default: 1,
        rendered: false,
        parseHTML: (element: HTMLElement) => {
          const level = parseInt(element.getAttribute('data-level') || element.tagName.replace(/^H/, ''));
          return level && this.options.levels.includes(level as Level) ? level : 1;
        },
        renderHTML: (attributes: { level: Level }) => ({
          'data-level': attributes.level,
        }),
      },
    }
  },

  group: 'block',

  content: 'inline*',

  defining: true,

  parseHTML() {
    return this.options.levels
      .map((level: Level) => ({
        tag: `h${level}`,
        attrs: { level },
      }))
  },

  renderHTML({ node, HTMLAttributes }: { node: ProseMirrorNode, HTMLAttributes: Record<string, string | number | boolean> }) {
    const hasLevel = this.options.levels.includes(node.attrs.level as Level);
    const level = hasLevel ? node.attrs.level : 1;

    return [
      `h${level}`,
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        'data-type': 'heading',
      }),
      0,
    ]
  },

  addCommands() {
    return {
      setHeading: (attributes: { level: Level }) => ({ commands }: CommandProps) => {
        if (!this.options.levels.includes(attributes.level)) {
          return false
        }

        return commands.setNode(this.name, attributes)
      },
      toggleHeading: (attributes: { level: Level }) => ({ commands }: CommandProps) => {
        if (!this.options.levels.includes(attributes.level)) {
          return false
        }

        return commands.toggleNode(this.name, 'paragraph', attributes)
      },
    }
  },

  addKeyboardShortcuts() {
    return this.options.levels.reduce((items: Record<string, () => boolean>, level: Level) => {
      return {
        ...items,
        [`Mod-Alt-${level}`]: () => this.editor.commands.toggleHeading({ level }),
      }
    }, {})
  },

  addNodeView() {
    return ReactNodeViewRenderer(HeadingView)
  },
});

export default Heading;
