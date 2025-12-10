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
      // x: "100%",
      transition: {
        duration: 0.3,
        ease: [0.76, 0, 0.24, 1], // Custom bezier for smooth "luxury" feel
      },
    },
    open: {
      x: "0%",
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  const linkContainerVariants = {
    closed: { opacity: 0 },
    open: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const linkVariants: any = {
    closed: { y: "100%", opacity: 0 },
    open: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const menuLinks: any = [
    { title: "Case Studies", href: "#" },
    { title: "Our Agency", href: "#" },
    { title: "News & Insights", href: "#" },
    { title: "Contact Us", href: "#" },
  ];

  const secondaryLinks = ["Instagram", "LinkedIn", "Twitter", "Awwwards"];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 
            BACKDROP LAYER: 
            Fixed full screen, same color as menu (#1C1C1C).
            Fades in (opacity 0->1) to cover the page content behind the sliding menu.
            z-index is 40, just below the menu slider (z-50).
          */}
          <motion.div
            variants={backdropVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-[#1C1C1C] z-52 pointer-events-none"
            // pointer-events-none ensures clicks pass through if needed during transition,
            // though the menu on top usually captures them.
          />
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-[#1C1C1C] text-[#F4F4F4] z-53 flex flex-col justify-between h-screen w-screen px-5 py-8 md:px-20 md:py-12"
          >
            {/* Main Navigation Links */}
            <div className="flex flex-col md:flex-row w-full h-full">
              <div className="flex-1 flex flex-col justify-center">
                <motion.nav
                  variants={linkContainerVariants}
                  initial="closed"
                  animate="open"
                  className="flex flex-col gap-4"
                >
                  {menuLinks.map((link, index) => (
                    <div key={index} className="overflow-hidden">
                      <motion.div variants={linkVariants}>
                        <a
                          href={link.href}
                          className="text-4xl md:text-7xl font-bold tracking-tighter uppercase hover:text-gray-400 transition-colors duration-300 flex items-center gap-4 group"
                        >
                          {link.title}
                          <ArrowUpRight className="opacity-0 -translate-x-10 translate-y-10 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 w-8 h-8 md:w-16 md:h-16" />
                        </a>
                      </motion.div>
                    </div>
                  ))}
                </motion.nav>
              </div>

              {/* Secondary / Footer Info in Menu */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mt-10 md:mt-0 md:w-1/3 flex flex-col justify-end gap-10 text-sm uppercase tracking-wide text-gray-400"
              >
                <div className="space-y-4">
                  <h4 className="text-white">Socials</h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {secondaryLinks.map(item => (
                      <li key={item}>
                        <a
                          href="#"
                          className="hover:text-white transition-colors"
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="text-white">Get in touch</h4>
                  <p>info@basicagency.com</p>
                  <p>+1 619 294 6366</p>
                </div>

                <p className="text-xs normal-case opacity-50">
                  © 2024 Basic/Dept®. All rights reserved.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
