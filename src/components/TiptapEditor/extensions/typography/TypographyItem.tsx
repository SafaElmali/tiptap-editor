import React from "react";

// Typography Item Component
interface TypographyItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onDragStart: (e: React.DragEvent) => void;
  onClick: () => void;
}

const TypographyItem: React.FC<TypographyItemProps> = ({
  icon,
  label,
  onDragStart,
  onClick,
}) => {
  return (
    <div className="flex flex-col items-center">
      <div
        draggable
        onDragStart={onDragStart}
        onClick={onClick}
        className={`flex items-center justify-center w-12 h-12 rounded-xl shadow-sm bg-white border border-gray-100 hover:border-blue-300 hover:shadow-md hover:scale-105 transition-all duration-200 cursor-grab active:cursor-grabbing`}
      >
        {icon}
      </div>
      <div className="text-xs text-gray-400 mt-1">{label}</div>
    </div>
  );
};

export default TypographyItem;
