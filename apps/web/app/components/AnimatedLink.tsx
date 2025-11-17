import { motion } from "framer-motion";
import { useState } from "react";

const transitionSettings = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.18,
};

export const AnimatedLink = ({ children, href }: any) => {
  const [originX, setOriginX] = useState<0 | 1>(1); // 0 => left, 1 => right
  const [isHovered, setIsHovered] = useState(false);

  const handleHoverStart = () => {
    // snap origin to left immediately, then animate scale
    setOriginX(0);
    // ensure origin is flushed to DOM before we start the scale animation
    requestAnimationFrame(() => setIsHovered(true));
  };

  const handleHoverEnd = () => {
    // snap origin to right first, then animate scale down after the frame
    setOriginX(1);
    requestAnimationFrame(() => setIsHovered(false));
  };

  return (
    <motion.a
      href={href}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      initial={false}
      className="relative inline-block text-sm font-light"
    >
      {children}

      <motion.span
        // only animate the scale; originX is set/changed immediately via state
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ scaleX: transitionSettings } as any}
        // set originX directly as prop (no transition) so it snaps
        style={{
          transformOrigin: `${originX === 0 ? "left" : "right"} center`,
          position: "absolute",
          bottom: 2,
          left: 0,
          right: 0,
          height: 1,
          backgroundColor: "currentColor",
        }}
      />
    </motion.a>
  );
};
