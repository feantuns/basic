import { motion } from "framer-motion";

const transitionSettings = {
  type: "tween",
  ease: "easeOut",
  duration: 0.2,
};

const underlineVariants = {
  // 🏠 When resting (not hovered) - State for SHRINKING Right-to-Left
  rest: {
    scaleX: 0,
    originX: 1, // Set target origin to the right (1)
    transition: {
      // Apply the standard transition to scaleX
      scaleX: transitionSettings,
      // Override the transition for originX: make it instant (duration: 0)
      originX: { duration: 0 },
    },
  },
  // 🖱️ When hovering - State for GROWING Left-to-Right
  hover: {
    scaleX: 1,
    originX: 0, // Set target origin to the left (0)
    transition: {
      // Ensure scaleX has a smooth transition
      scaleX: transitionSettings,
      // Override the transition for originX: make it instant
      // This ensures it snaps to the left (0) before scaling out
      originX: { duration: 0 },
    },
  },
};

export const AnimatedLink = ({ children, href }: any) => {
  return (
    <motion.a
      href={href}
      // Use whileHover on the wrapper to trigger the animation
      whileHover="hover"
      initial="rest"
      className="relative inline-block font-extralight" // Your link styling and position: relative
      // Optional: Add a transition to make the whole component scale slightly too
    >
      {children}

      {/* The Underline Element */}
      <motion.span
        variants={underlineVariants as any}
        // CSS for the underline
        style={{
          position: "absolute",
          bottom: -2, // Adjust position as needed
          left: 0,
          right: 0,
          height: 1,
          backgroundColor: "currentColor", // Use link color
        }}
      />
    </motion.a>
  );
};
