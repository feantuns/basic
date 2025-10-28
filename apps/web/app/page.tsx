"use client";
import Hero from "./components/Hero";
import Loader from "./components/Loader";

export default function Home() {
  return (
    <>
      <Loader />
      <main>
        <Hero />
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
