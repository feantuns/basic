import HeaderLogo from "./HeaderLogo";

export default function Header() {
  return (
    <header className="fixed z-51 top-0 w-screen">
      <div className="px-20 py-13 flex items-center justify-between">
        <HeaderLogo />
      </div>
    </header>
  );
}
