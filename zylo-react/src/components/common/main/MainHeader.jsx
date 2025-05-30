import { Link } from "react-router-dom";

export const MainHeader = () => {
  return (
    <header id="main-header">
      <Link to="/" id="logo">
        zylo
      </Link>
      <nav>
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/services">Services</Link>
      </nav>
    </header>
  );
};
