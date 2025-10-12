import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";

export default function Home() {
  return (
    <main>
      <section className="relative h-screen w-full overflow-hidden">
        <video
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
  );
}
