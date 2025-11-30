import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface MenuButtonProps {
  toggleMenu: () => void;
  isOpen: boolean;
}

export const MenuButton = ({ toggleMenu, isOpen }: MenuButtonProps) => {
  // Define the animation states (variants) for the *container* SVG
  const svgVariants = {
    rest: {
      transition: {},
    },
    hover: {
      transition: {},
    },
  };

  // Define the animation states (variants) for the *individual* <circle>
  const circleVariants = {
    rest: i => ({
      // i is the custom prop 'custom' passed from the map/array below
      cx: i === 0 ? 1.0 : i === 2 ? 20.0 : 10.5,
      r: 3.0,
      transition: { duration: 0.08 },
    }),
    hover: i => ({
      // Move the first circle left and the third circle right to increase spacing
      cx: i === 0 ? -1 : i === 2 ? 22 : 10.5,
      r: 3.0,
      transition: { duration: 0.08 },
    }),
  };

  const circlesData = [{ id: 1 }, { id: 2 }, { id: 3 }];

  return (
    <button
      onClick={toggleMenu}
      className="flex items-center justify-center w-12 h-12 cursor-pointer text-white mix-blend-difference focus:outline-none"
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="close"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <X size={32} />
          </motion.div>
        ) : (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 25 5"
              fill="currentColor"
              className="w-6 h-6"
              variants={svgVariants}
              initial="rest"
              whileHover="hover"
              animate="rest"
              style={{ overflow: "visible" }}
            >
              {circlesData.map((circle, index) => (
                <motion.circle
                  key={circle.id}
                  cy="2.5"
                  // Pass the index as a custom prop for use in circleVariants
                  custom={index}
                  variants={circleVariants}
                />
              ))}
            </motion.svg>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};
