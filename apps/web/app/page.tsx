"use client";
import { useRef, useState } from "react";
import Loader from "./components/Loader";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isActive, setIsActive] = useState(false);

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
          className="relative h-screen w-full overflow-hidden"
          onMouseEnter={() => {
            setIsActive(true);
            document.body.style.cursor = "none";
          }}
          onMouseLeave={() => {
            setIsActive(false);
            document.body.style.cursor = "auto";
          }}
        >
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
      </main>
    </>
  );
}
