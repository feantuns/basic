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
    closed: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.76, 0, 0.24, 1], // Custom bezier for smooth "luxury" feel
      },
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  const menuSlideVariants: any = {
    initial: {
      width: 0,
    },
    closed: {
      opacity: 0,
      width: "80%",
      transition: {
        duration: 0,
      },
    },
    open: {
      width: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.2,
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
            variants={menuSlideVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-54 bg-[#1C1C1C] pointer-events-none"
          />
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-[#1C1C1C] text-[#F4F4F4] z-53 flex flex-col justify-between h-screen w-screen px-5 py-8 md:px-20 md:py-12"
          >
            <div className="flex flex-col w-full h-full">
              <div className="flex flex-row leading-[120%] text-secondary uppercase text-sm gap-12 items-start">
                <div className="flex flex-row gap-8 items-start">
                  <p>●</p>
                  <p>
                    (5) Internal Works
                    <br />
                    ©25 <small>c/o</small> BASIC/DEPT®
                  </p>
                </div>

                <p>
                  A collection of internal project and initiatives under the
                  BASIC/DEPT® brand.
                </p>
              </div>

              <div className="grow-1" />

              <div className="flex flex-row leading-[120%] text-footer-copyright uppercase text-sm gap-12 items-center justify-between">
                <p>BASIC/DEPT®, INC</p>
                <p>10 - 25©</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
