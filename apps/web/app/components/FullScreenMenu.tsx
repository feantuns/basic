import { AnimatePresence, motion, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { getRelativePosition } from "../utils";

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

  const heroRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const springX = useSpring(80, {
    stiffness: 800,
    damping: 100,
    bounce: 0,
  });
  const springY = useSpring(50, {
    stiffness: 800,
    damping: 100,
    bounce: 0,
  });

  useEffect(() => {
    springY.set(window?.innerHeight / 2);
  }, []);

  useEffect(() => {
    const handleMove = (e: any) => {
      const { x, y } = getRelativePosition(e, heroRef.current);
      springX.set(x);
      springY.set(y);
    };
    if (isActive) window.addEventListener("mousemove", handleMove);
    else window.removeEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [isActive]);

  useEffect(() => {
    const handleMouseMove = (e: any) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const isInside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      // when you leave hero area
      if (!isInside && isActive) {
        setIsActive(false);
        document.body.style.cursor = "auto";

        // animate smoothly to the hero's center
        springX.set(rect.width - 20);
        springY.set(rect.height / 2);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isActive, springX, springY]);

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
              <div className="flex flex-row leading-[120%] text-secondary uppercase text-sm gap-12 items-start pb-12 pr-5 md:pr-20">
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
                ref={heroRef}
                variants={cardsSlideVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="grow-1 overflow-x-auto no-scrollbar min-h-0 flex gap-2"
                onMouseEnter={() => {
                  if (!isPlaying) {
                    setIsActive(true);
                    document.body.style.cursor = "none";
                  }
                }}
                onMouseLeave={() => {
                  if (!isPlaying) {
                    document.body.style.cursor = "auto";
                    setIsActive(false);
                    springX.set(80);
                    springY.set(Number(heroRef.current?.clientHeight) / 2);
                  }
                }}
              >
                {/* Custom cursor */}
                <motion.div
                  className="absolute pointer-events-none z-50 items-center justify-center w-30 h-30 rounded-full bg-white text-center"
                  style={{
                    y: springY,
                    x: springX,
                    translateX: "-50%",
                    translateY: "-50%",
                    display: isPlaying ? "none" : "flex",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 800,
                    damping: 100,
                    bounce: 0,
                  }}
                >
                  <div className="relative text-sm font-semibold uppercase leading-[115%] tracking-wide">
                    Watch <br /> reel
                    <span className="absolute top-[260%] left-[50%] translate-x-[-50%] text-sm font-semibold uppercase leading-[115%] text-white">
                      BASIC/DEPT® 2010-∞
                    </span>
                  </div>
                </motion.div>
                {cards.map((card, index) => (
                  <div
                    key={index}
                    className="w-[calc(113vw/4)] flex-shrink-0 flex flex-col gap-3 group last:mr-22"
                  >
                    <div className="pl-2 border-l-secondary group-last:border-r-secondary group-last:border-r-1 group-last:pr-2 border-l-1 w-full flex-1 h-[calc(100%-28px)]">
                      <div className="bg-[#1C1C1C] w-full h-full overflow-hidden">
                        <img
                          src={card.image}
                          alt="slide"
                          className="relative w-full h-[73%] object-cover transition-transform duration-300 ease-in scale-110 group-hover:scale-100"
                        />
                        <div className="relative p-4 z-1 w-full h-[50%] bg-[#1C1C1C] transition-transform duration-300 ease-in-out translate-y-0 group-hover:translate-y-[-68%]">
                          <div className="flex justify-between text-secondary text-xl tracking-wide uppercase font-semibold">
                            <span>{card.title}</span>
                            <span>{card.year}</span>
                          </div>
                          <span className="text-secondary text-xs uppercase mt-2 block">
                            {card.subtitle}
                          </span>
                          <span className="text-secondary text-sm mt-5 block transition-opacity duration-400 ease-in-out opacity-0 group-hover:opacity-100">
                            {card.description}
                          </span>
                          <a
                            href={card.link}
                            target="_self"
                            className="text-secondary underline font-semibold text-sm mt-8 block transition-opacity duration-400 ease-in-out opacity-0 group-hover:opacity-100"
                          >
                            {card.linkText}
                          </a>
                        </div>
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
                className="flex flex-row leading-[120%] text-footer-copyright uppercase text-sm gap-12 items-center justify-between pt-8 pr-5 md:pr-20"
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

const cards = [
  {
    id: 1,
    image: "/menu_slide_0.webp",
    title: "B/D® JAMS",
    subtitle: "It's a vibe",
    description:
      "A weekly-ish playlist curated by the employees @ BASIC/DEPT®",
    linkText: "Visit the Site",
    link: "https://jams.basicagency.com/",
    year: "©2022",
  },
  {
    id: 2,
    image: "/menu_slide_1.webp",
    title: "Applied®",
    subtitle: "Thoughts & Perspectives",
    description:
      "Our panel series and thought-leadership platform where we share perspectives and tactics related to strategy, design, and technology.",
    linkText: "Explore Applied",
    link: "https://www.basicagency.com/thinking/category/applied",
    year: "©2020",
  },
  {
    id: 3,
    image: "/menu_slide_2.webp",
    title: "Moves®",
    subtitle: "Our New HQ",
    description:
      "When we moved into our new HQ, we put together a site experience providing an in-depth look into the two-year process imagining, designing, and developing our new office we call home.",
    linkText: "Visit the Site",
    link: "https://moves.basicagency.com/",
    year: "©2019",
  },
  {
    id: 4,
    image: "/menu_slide_3.webp",
    title: "Crafted®",
    subtitle: "Creative Community",
    description:
      "A communal initiative we operate to celebrate diversity and creativity by bringing together people from different backgrounds and interests.",
    linkText: "Visit the Site",
    link: "https://experiencecrafted.com/",
    year: "©2019",
  },
  {
    id: 5,
    image: "/menu_slide_4.webp",
    title: "Brandbeats®",
    subtitle: "Podcast Series",
    description:
      "Our podcast series garnering 45,000+ listens per episode providing candid conversations around various industry related topics.",
    linkText: "Explore Brandbeats",
    link: "https://www.basicagency.com/thinking/categories/brandbeats",
    year: "©2017",
  },
];
