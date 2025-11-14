import { motion } from "framer-motion";

export const AnimatedLink = ({ children, href }: any) => {
  return (
    <motion.a
      href={href}
      // Use whileHover on the wrapper to trigger the animation
      whileHover="hover"
      initial="rest"
      className="relative block" // Your link styling and position: relative
      // Optional: Add a transition to make the whole component scale slightly too
    >
      {children}

      {/* The Underline Element */}
      <motion.span
        variants={{
          rest: { scaleX: 0, originX: 1 }, // Initial state: width is 0
          hover: { scaleX: 1, originX: 0 }, // Hover state: width is 1 (full width)
        }}
        transition={{
          type: "spring", // Use a spring or tween for smooth movement
          stiffness: 400,
          damping: 30,
          duration: 0.25,
        }}
        // CSS for the underline
        style={{
          position: "absolute",
          bottom: -2, // Adjust position as needed
          left: 0,
          right: 0,
          height: 2,
          backgroundColor: "currentColor", // Use link color
          transformOrigin: "left", // Crucial for left-to-right growth
        }}
      />
    </motion.a>
  );
};
