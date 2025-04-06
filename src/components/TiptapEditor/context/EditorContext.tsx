import React, { createContext, ReactNode } from 'react';
import { Editor } from '@tiptap/react';

interface EditorContextType {
  editor: Editor | null;
}

const EditorContext = createContext<EditorContextType>({ editor: null });

interface EditorProviderProps {
  editor: Editor | null;
  children: ReactNode;
}

export const EditorProvider: React.FC<EditorProviderProps> = ({ editor, children }) => {
  return (
    <EditorContext.Provider value={{ editor }}>
      {children}
    </EditorContext.Provider>
  );
};

export default EditorContext;
