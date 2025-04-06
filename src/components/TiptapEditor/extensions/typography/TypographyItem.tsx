import React from "react";
import { motion } from "framer-motion";

// Typography Item Component
interface TypographyItemProps {
  icon: React.ReactNode;
  label: string;
  onDragStart: (e: React.DragEvent) => void;
  onClick: () => void;
}

const TypographyItem: React.FC<TypographyItemProps> = ({
  icon,
  label,
  onDragStart,
  onClick,
}) => {
  // Use a wrapper div to handle the drag events
  return (
    <div className="flex flex-col items-center">
      <div 
        draggable
        onDragStart={onDragStart}
        onClick={onClick}
      >
        <motion.div
          className="flex items-center justify-center w-12 h-12 rounded-xl shadow-sm bg-white border border-gray-100 cursor-grab active:cursor-grabbing"
          whileHover={{ 
            scale: 1.05, 
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            borderColor: "#93c5fd" // blue-300 equivalent
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 17 
          }}
        >
          {icon}
        </motion.div>
      </div>
      
      <motion.div 
        className="text-xs text-gray-400 mt-1"
        initial={{ opacity: 0.8 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.div>
    </div>
  );
};

export default TypographyItem;
