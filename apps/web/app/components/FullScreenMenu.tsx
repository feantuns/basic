import { AnimatePresence, motion } from "framer-motion";

export const FullScreenMenu = ({ isOpen }) => {
  const backdropVariants: any = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: [0.76, 0, 0.24, 1],
      },
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.1,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  const menuVariants: any = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.76, 0, 0.24, 1],
      },
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.2,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.3,
      },
    },
  };

  const footerVariants: any = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.76, 0, 0.24, 1],
      },
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.8,
      },
    },
  };

  const menuSlideVariants: any = {
    initial: {
      width: 0,
    },
    closed: {
      opacity: 0,
      width: "90%",
      transition: {
        duration: 0,
      },
    },
    open: {
      width: 0,
      opacity: 1,
      transition: {
        width: {
          duration: 1,
          ease: [0.95, 0, 0.2, 1],
        },
        opacity: {
          duration: 0.2,
        },
      },
    },
  };

  const cardsSlideVariants: any = {
    initial: {
      x: "20%",
    },
    closed: {
      x: "20%",
      transition: {
        delay: 0.5,
      },
    },
    open: {
      x: 0,
      transition: {
        duration: 1.2,
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
            className="fixed inset-0 bg-[#1C1C1C] text-[#F4F4F4] z-53 flex flex-col justify-between h-screen w-screen pl-5 py-8 md:pl-20 md:py-12"
          >
            <div className="flex flex-col w-full h-full">
              <div className="flex flex-row leading-[120%] text-secondary uppercase text-sm gap-12 items-start pr-5 md:pr-20">
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

              <motion.div
                variants={cardsSlideVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="grow-1 overflow-x-auto no-scrollbar flex gap-2 pt-12 pb-8"
              >
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    className="w-[calc(113vw/4)] h-full flex-shrink-0 flex flex-col gap-3"
                  >
                    <div className="pl-2 border-l-secondary border-l-1 w-full flex-1">
                      <div className="bg-[#1C1C1C] w-full flex flex-col">
                        <img
                          src={`/menu_slide_${index}.webp`}
                          alt="slide"
                          className="w-full object-cover flex-1"
                        />
                        <div className="min-h-[80px] w-full bg-[#1C1C1C]"></div>
                      </div>
                    </div>
                    <span className="text-secondary inline-block text-xs font-light">
                      {index < 9 ? `0${index + 1}` : index + 1}
                    </span>
                  </div>
                ))}
              </motion.div>

              <motion.div
                variants={footerVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="flex flex-row leading-[120%] text-footer-copyright uppercase text-sm gap-12 items-center justify-between pt-1 pr-5 md:pr-20"
              >
                <p>BASIC/DEPT®, INC</p>
                <p>10 - 25©</p>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
