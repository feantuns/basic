import { AnimatedLink } from "./AnimatedLink";
import HeaderLogo from "./HeaderLogo";
import { MenuButton } from "./MenuButton";

export default function Header() {
  return (
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
        <MenuButton />
      </div>
    </header>
  );
}
