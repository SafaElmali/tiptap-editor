import React, { useState, useEffect } from 'react';
import { useActiveNode } from '../../context/ActiveNodeContext';

interface ColorPickerProps {
  propertyName: string;
  defaultColor?: string;
  label?: string;
  onColorChange?: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ 
  propertyName,
  defaultColor = '#1a202c',
  label = 'Color',
  onColorChange 
}) => {
  const { activeNodeType, activeNodeAttrs, updateNodeAttribute } = useActiveNode();
  const [color, setColor] = useState(defaultColor);
  
  // Predefined color palette
  const colors = [
    '#1a202c', // Default dark
    '#2563eb', // Blue
    '#7c3aed', // Purple
    '#db2777', // Pink
    '#dc2626', // Red
    '#d97706', // Amber
    '#059669', // Emerald
    '#0891b2', // Cyan
  ];

  // Update color when active node changes
  useEffect(() => {
    if (activeNodeAttrs && activeNodeAttrs[propertyName]) {
      const attrValue = activeNodeAttrs[propertyName];
      if (typeof attrValue === 'string') {
        setColor(attrValue);
      }
    } else {
      setColor(defaultColor);
    }
  }, [activeNodeAttrs, propertyName, defaultColor]);

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    
    // Update the node attribute through the context
    updateNodeAttribute(propertyName, newColor);
    
    if (onColorChange) {
      onColorChange(newColor);
    }
  };

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleColorChange(e.target.value);
  };

  // Only show color picker if there is an active node
  if (!activeNodeType) {
    return null;
  }

  return (
    <div className="color-picker">
      <h3 className="text-sm font-medium mb-2">{label}</h3>
      <div className="flex flex-wrap gap-2 mb-2">
        {colors.map((colorOption) => (
          <button
            key={colorOption}
            className={`w-6 h-6 rounded-full border ${
              color === colorOption ? 'ring-2 ring-offset-1 ring-blue-500' : 'border-gray-300'
            }`}
            style={{ backgroundColor: colorOption }}
            onClick={() => handleColorChange(colorOption)}
            aria-label={`Color: ${colorOption}`}
          />
        ))}
      </div>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={color}
          onChange={handleCustomColorChange}
          className="w-8 h-8 p-0 border-0 rounded cursor-pointer"
        />
        <input
          type="text"
          value={color}
          onChange={(e) => handleColorChange(e.target.value)}
          className="flex-1 px-2 py-1 text-sm border rounded"
        />
      </div>
    </div>
  );
};

export default ColorPicker;
