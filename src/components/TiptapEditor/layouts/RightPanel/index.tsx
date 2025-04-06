import { motion } from 'framer-motion';
import { panelVariants, itemVariants } from './animations';
import ColorPicker from '../../components/ColorPicker/ColorPicker';
import { useActiveNode } from '../../context/ActiveNodeContext';

const RightPanel = () => {
  const { activeNodeType } = useActiveNode();

  return (
    <motion.div 
      className="right-panel h-full"
      initial="hidden"
      animate="visible"
      variants={panelVariants}
    >
      <motion.div variants={itemVariants}>
        <h2 className="text-lg font-medium mb-4">Properties</h2>
        <div className="p-4 border rounded-lg bg-white shadow-sm">
          {activeNodeType && (
            <>
              <div className="mb-4">
                <ColorPicker 
                  propertyName="color" 
                  label="Text Color" 
                  defaultColor="#1a202c" 
                />
              </div>
              <div className="mb-4">
                <ColorPicker 
                  propertyName="backgroundColor" 
                  label="Background Color" 
                  defaultColor="transparent" 
                />
              </div>
            </>
          )}
          {!activeNodeType && (
            <p className="text-gray-500 text-sm">Select a node to see formatting options</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RightPanel;
