import Link from "next/link";

const Header = () => {
  return (
    <header className="header">
      <nav className="nav">
        <Link href="/">
          <a>Champions of Commerce</a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
