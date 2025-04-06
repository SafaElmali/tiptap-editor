import { motion } from 'framer-motion';
import TypographyItems from '../../extensions/typography/TypographyItems';
import { panelVariants, itemVariants } from './animations';

const LeftPanel = () => {
  return (
    <motion.div 
      className="left-panel h-full"
      initial="hidden"
      animate="visible"
      variants={panelVariants}
    >
      <motion.div variants={itemVariants}>
        <TypographyItems />
      </motion.div>
    </motion.div>
  );
};

export default LeftPanel;
