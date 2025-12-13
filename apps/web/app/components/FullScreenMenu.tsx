import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export const FullScreenMenu = ({ isOpen }) => {
  // Animation for the dark background fade
  const backdropVariants: any = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.5, // Match the slide duration for sync
        ease: [0.76, 0, 0.24, 1],
      },
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  const menuVariants: any = {
    initial: {
      x: "100%",
    },
    closed: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.76, 0, 0.24, 1], // Custom bezier for smooth "luxury" feel
      },
      transitionEnd: {
        x: "100%",
      },
    },
    open: {
      x: "0%",
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={backdropVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-[#1C1C1C] z-52 pointer-events-none"
          />
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-[#1C1C1C] text-[#F4F4F4] z-53 flex flex-col justify-between h-screen w-screen px-5 py-8 md:px-20 md:py-12"
          >
            <div className="flex flex-col md:flex-row w-full h-full"></div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
