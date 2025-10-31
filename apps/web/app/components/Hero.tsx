"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { getRelativePosition } from "../utils";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const realVideoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

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
      console.log(e);
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

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden"
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
          springX.set(Number(heroRef.current?.clientWidth) / 2);
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
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{ display: isPlaying ? "none" : "block" }}
        onClick={() => {
          setIsPlaying(true);
          if (realVideoRef.current) {
            realVideoRef.current.currentTime = 0;
            realVideoRef.current.play();
            realVideoRef.current.volume = 1;
            document.body.style.cursor = "auto";
          }
        }}
      >
        <source src="/hero_video.mp4" type="video/mp4" />
      </video>
      <video
        ref={realVideoRef}
        autoPlay
        loop
        playsInline
        preload="none"
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{ display: isPlaying ? "block" : "none" }}
        onClick={() => {
          setIsPlaying(false);
          if (realVideoRef.current) {
            realVideoRef.current.pause();
            document.body.style.cursor = "none";
          }
        }}
      >
        <source src="/hero_video_sound.mp4" type="video/mp4" />
      </video>
    </section>
  );
}
