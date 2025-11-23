import { motion } from "framer-motion";

export const MenuButton = () => {
  // Define the animation states (variants) for the *container* SVG
  // This will manage the transition for all child <circle> elements.
  const svgVariants = {
    rest: {
      transition: {},
    },
    hover: {
      transition: {},
    },
  };

  // Define the animation states (variants) for the *individual* <circle>
  // We only need to move the outer two circles (cx: 2.5 and cx: 18.5)
  const circleVariants = {
    rest: i => ({
      // i is the custom prop 'custom' passed from the map/array below
      cx: i === 0 ? 1.0 : i === 2 ? 20.0 : 10.5,
      r: 3.0,
      transition: { duration: 0.1 },
    }),
    hover: i => ({
      // Move the first circle left and the third circle right to increase spacing
      cx: i === 0 ? -1 : i === 2 ? 22 : 10.5,
      r: 3.0,
      transition: { duration: 0.1 },
    }),
  };

  const circlesData = [
    { id: 1, defaultCx: 2.5 },
    { id: 2, defaultCx: 10.5 },
    { id: 3, defaultCx: 18.5 },
  ];

  return (
    <motion.button
      role="button"
      aria-label="Open menu"
      title="Menu"
      className="min-w-[22px] h-[26px] cursor-pointer text-white"
      initial="rest" // Set initial state
      whileHover="hover" // Animate to 'hover' state on hover
      animate="rest" // Animate back to 'rest' state on hover out
    >
      <figure>
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 25 5"
          fill="currentColor"
          variants={svgVariants}
          style={{ overflow: "visible" }}
        >
          {circlesData.map((circle, index) => (
            <motion.circle
              key={circle.id}
              cy="2.5" // y-coordinate remains fixed
              r="2.5" // radius remains fixed
              initial={false} // Prevent initial animation on mount
              custom={index} // Pass the index as a custom prop for use in circleVariants
              variants={circleVariants} // Apply circle variants
              // The initial cx is handled by the 'rest' state in circleVariants
            />
          ))}
        </motion.svg>
      </figure>
    </motion.button>
  );
};
