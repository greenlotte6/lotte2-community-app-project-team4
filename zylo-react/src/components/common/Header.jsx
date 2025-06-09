import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "../../contexts/ThemeContext";
import { faShareFromSquare } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export const Header = ({ title }) => {
  const { toggled, toggle } = useTheme();

  return (
    <header id="content-header" className={toggled ? "dark" : "light"}>
      <h3 className="title">{title}</h3>
      <nav>
        <div className="theme">
          <span className="theme-name">Light</span>
          <div className="theme-toggle" onClick={toggle}>
            <button className={toggled ? "toggled" : ""}></button>
          </div>
          <span className="theme-name">Dark</span>
        </div>
        <div className="nav">
          <div className="header-toolbar">
            <Link to="">
              <FontAwesomeIcon icon={faShareFromSquare} />
            </Link>
          </div>
          <Link to="https://naver.com">
            <div className="profile">
              <img src="/images/profile_sample.jpg" alt="" />
              <div>
                <h3 className="profile-name">홍길동</h3>
                <span className="profile-email">hgd313@example.com</span>
              </div>
            </div>
          </Link>
        </div>
      </nav>
    </header>
  );
};
