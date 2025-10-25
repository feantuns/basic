"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";
import Loader from "./components/Loader";

function getRelativePosition(event: any, container: any) {
  const rect = container.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  return { x, y };
}

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [isActive, setIsActive] = useState(false);

  const springX = useSpring(50, {
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
    springX.set(window?.innerWidth / 2);
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
        springX.set(rect.width / 2);
        springY.set(rect.height / 2);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isActive, springX, springY]);

  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <>
      <Loader onAnimationComplete={playVideo} />
      <main>
        <section
          ref={heroRef}
          className="relative h-screen w-full overflow-hidden"
          onMouseEnter={() => {
            setIsActive(true);
            document.body.style.cursor = "none";
          }}
          onMouseLeave={() => {
            document.body.style.cursor = "auto";
            setIsActive(false);
            springX.set(Number(heroRef.current?.clientWidth) / 2);
            springY.set(Number(heroRef.current?.clientHeight) / 2);
          }}
        >
          {/* Custom cursor */}
          <motion.div
            className="absolute pointer-events-none z-50 flex items-center justify-center w-30 h-30 rounded-full bg-white text-center"
            style={{
              y: springY,
              x: springX,
              translateX: "-50%",
              translateY: "-50%",
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
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="absolute top-0 left-0 w-full h-full object-cover"
          >
            <source src="/hero_video.mp4" type="video/mp4" />
          </video>
        </section>
        <section>
          <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-4xl font-bold mb-4">
              Welcome to the Video Page
            </h1>
            <p className="mb-4">
              This is a sample page with a full-screen video background. Hover
              over the video to hide the cursor.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              euismod, nunc ut laoreet tincidunt, nunc nisl aliquam nunc, eget
              aliquam nisl nunc euismod nunc. Sed euismod, nunc ut laoreet
              tincidunt, nunc nisl aliquam nunc, eget aliquam nisl nunc euismod
              nunc.
            </p>
          </div>
        </section>
        <section className="h-screen flex items-center justify-center bg-gray-100">
          <h2 className="text-3xl font-semibold">
            Scroll Down for More Content
          </h2>
        </section>
      </main>
    </>
  );
}
