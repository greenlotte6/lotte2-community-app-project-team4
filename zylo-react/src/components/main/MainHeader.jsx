import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

export const MainHeader = () => {
  return (
    <header id="main-header">
      <Link to="/" id="logo">
        zylo
      </Link>
      <nav>
        <HashLink smooth to="/#intro">
          Home
        </HashLink>
        <HashLink smooth to="/#about">
          About
        </HashLink>
        <HashLink smooth to="/#services">
          Services
        </HashLink>
      </nav>
    </header>
  );
};
