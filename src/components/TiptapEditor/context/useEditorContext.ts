import { useContext } from 'react';
import EditorContext from './EditorContext';

export const useEditorContext = () => {
  return useContext(EditorContext);
};
