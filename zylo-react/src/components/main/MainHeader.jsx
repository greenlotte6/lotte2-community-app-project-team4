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
          홈
        </HashLink>
        <HashLink smooth to="/#about">
          소개
        </HashLink>
        <HashLink smooth to="/#services">
          서비스
        </HashLink>
        <Link to="/login">로그인</Link>
        <Link to="/signup">회원가입</Link>
      </nav>
    </header>
  );
};
