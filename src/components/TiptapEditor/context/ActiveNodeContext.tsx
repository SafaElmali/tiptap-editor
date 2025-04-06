import React, { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';
import { useEditorContext } from './useEditorContext';

interface ActiveNodeContextType {
  activeNodeType: string | null;
  activeNodeAttrs: Record<string, unknown>;
  isNodeActive: (nodeType: string) => boolean;
  updateNodeAttribute: (propertyName: string, value: unknown) => void;
}

const ActiveNodeContext = createContext<ActiveNodeContextType>({
  activeNodeType: null,
  activeNodeAttrs: {},
  isNodeActive: () => false,
  updateNodeAttribute: () => {},
});

// Create a separate file for this hook in a real application to avoid Fast Refresh issues
// For now, we'll keep it here for simplicity
export const useActiveNode = (): ActiveNodeContextType => useContext(ActiveNodeContext);

interface ActiveNodeProviderProps {
  children: ReactNode;
}

export const ActiveNodeProvider: React.FC<ActiveNodeProviderProps> = ({ children }) => {
  const { editor } = useEditorContext();
  const [activeNodeType, setActiveNodeType] = useState<string | null>(null);
  const [activeNodeAttrs, setActiveNodeAttrs] = useState<Record<string, unknown>>({});

  const updateActiveNode = useCallback(() => {
    if (!editor) {
      setActiveNodeType(null);
      setActiveNodeAttrs({});
      return;
    }

    // Check for active nodes in priority order
    const nodeTypes = ['heading', 'paragraph', 'blockquote', 'codeBlock', 'listItem'];
    
    for (const type of nodeTypes) {
      if (editor.isActive(type)) {
        setActiveNodeType(type);
        setActiveNodeAttrs(editor.getAttributes(type));
        return;
      }
    }

    // If no specific node is active, set to null
    setActiveNodeType(null);
    setActiveNodeAttrs({});
  }, [editor]);

  useEffect(() => {
    if (!editor) return;

    // Update active node on selection change
    editor.on('selectionUpdate', updateActiveNode);
    editor.on('transaction', updateActiveNode);
    
    // Initial update
    updateActiveNode();

    return () => {
      editor.off('selectionUpdate', updateActiveNode);
      editor.off('transaction', updateActiveNode);
    };
  }, [editor, updateActiveNode]);

  const isNodeActive = (nodeType: string): boolean => {
    return activeNodeType === nodeType;
  };

  const updateNodeAttribute = (propertyName: string, value: unknown) => {
    if (!editor || !activeNodeType) return;
    
    const attrs = { [propertyName]: value };
    editor.chain().focus().updateAttributes(activeNodeType, attrs).run();
  };

  const value = {
    activeNodeType,
    activeNodeAttrs,
    isNodeActive,
    updateNodeAttribute,
  };

  return (
    <ActiveNodeContext.Provider value={value}>
      {children}
    </ActiveNodeContext.Provider>
  );
};
