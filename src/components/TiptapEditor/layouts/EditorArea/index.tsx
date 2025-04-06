import React from 'react';
import { EditorContent } from '@tiptap/react';
import { motion } from 'framer-motion';
import { contentVariants } from './animations';
import { useEditorContext } from '../../context/useEditorContext';

interface EditorAreaProps {
  handleContainerClick: () => void;
  handleDrop: (event: React.DragEvent) => void;
  handleDragOver: (event: React.DragEvent) => void;
}

const EditorArea = ({ 
  handleContainerClick, 
  handleDrop, 
  handleDragOver 
}: EditorAreaProps) => {
  const { editor } = useEditorContext();
  return (
    <div 
      className="editor-area flex-1 flex flex-col cursor-text p-4 border rounded-lg border-gray-200" 
      onClick={handleContainerClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <motion.div variants={contentVariants} className="flex-1 h-full">
        <EditorContent editor={editor} className="h-full" />
      </motion.div>
    </div>
  );
};

export default EditorArea;
