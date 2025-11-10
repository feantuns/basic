import HeaderLogo from "./HeaderLogo";

export default function Header() {
  return (
    <header className="fixed z-51 top-0 w-screen">
      <div className="px-20 py-13 flex items-center justify-between">
        <HeaderLogo />
        <nav>
          <ul className="flex gap-16 uppercase text-white text-sm">
            <li>
              <a href="/work">Work</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/news">News</a>
            </li>
            <li>
              <a href="/thinking">Thinking</a>
            </li>
            <li>
              <a href="/careers">Careers</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
