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
        <button
          role="button"
          aria-label="Open menu"
          title="Menu"
          className="w-[22px] h-[26px] cursor-pointer text-white"
        >
          <figure>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 21 5"
              fill="currentColor"
            >
              <circle cx="2.5" cy="2.5" r="2.5"></circle>
              <circle cx="10.5" cy="2.5" r="2.5"></circle>
              <circle cx="18.5" cy="2.5" r="2.5"></circle>
            </svg>
          </figure>
        </button>
      </div>
    </header>
  );
}
