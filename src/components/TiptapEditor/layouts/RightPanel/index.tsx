import { motion } from 'framer-motion';
import { panelVariants, itemVariants } from './animations';

const RightPanel = () => {
  return (
    <motion.div 
      className="right-panel h-full"
      initial="hidden"
      animate="visible"
      variants={panelVariants}
    >
      <motion.div variants={itemVariants}>
        <h2 className="text-lg font-medium mb-4">Properties</h2>
        {/* Add properties panel content here */}
        <div className="p-4 border rounded-lg bg-white shadow-sm">
          <p className="text-sm font-medium mb-2">Properties Panel</p>
          <p className="text-gray-500 text-sm">This panel will be used for properties in the future</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RightPanel;
