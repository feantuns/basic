"use-client";
import { useState, useEffect } from "react";
import { AnimatedLink } from "./AnimatedLink";
import HeaderLogo from "./HeaderLogo";
import { MenuButton } from "./MenuButton";
import { FullScreenMenu } from "./FullScreenMenu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  return (
    <>
      <header className="fixed z-51 top-0 w-screen">
        <div className="px-20 py-13 flex items-center justify-between">
          <HeaderLogo />
          <nav className="mr-[9rem]">
            <ul className="flex gap-16 uppercase text-white text-sm">
              <li>
                <AnimatedLink href="https://www.basicagency.com/services">
                  Work
                </AnimatedLink>
              </li>
              <li>
                <AnimatedLink href="https://www.basicagency.com/about">
                  About
                </AnimatedLink>
              </li>
              <li>
                <AnimatedLink href="https://www.basicagency.com/blog">
                  News
                </AnimatedLink>
              </li>
              <li>
                <AnimatedLink href="https://www.basicagency.com/thinking">
                  Thinking
                </AnimatedLink>
              </li>
              <li>
                <AnimatedLink href="https://www.basicagency.com/careers">
                  Careers
                </AnimatedLink>
              </li>
              <li>
                <AnimatedLink href="https://www.basicagency.com/contact">
                  Contact
                </AnimatedLink>
              </li>
            </ul>
          </nav>
          <MenuButton handleClick={() => setIsMenuOpen(true)} />
        </div>
      </header>

      {/* The Full Screen Menu Overlay */}
      <FullScreenMenu isOpen={isMenuOpen} />
    </>
  );
}
