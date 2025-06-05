import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesLeft,
  faCalendarDays,
  faClipboard,
  faComments,
  faFileLines,
  faGears,
  faHardDrive,
  faHome,
  faPenToSquare,
  faRightFromBracket,
  faTrashCan,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";

export const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { toggled } = useTheme();

  const toggleCollapse = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div id="side-container" className={toggled ? "dark" : ""}>
      <aside id="side-bar" className={collapsed ? "collapsed" : ""}>
        <nav id="collapse">
          <FontAwesomeIcon
            icon={faAnglesLeft}
            className={`collapse-btn ${collapsed ? "rotated" : ""}`}
            onClick={toggleCollapse}
          />
        </nav>
        <header>
          <h1 className={collapsed ? "collapsed" : ""}>zylo</h1>
        </header>

        <ul className="menu">
          <li className="menu-item">
            <Link to="/dashboard">
              <FontAwesomeIcon icon={faHome} className="menu-icon" />
              <span>홈</span>
            </Link>
          </li>
          {/*}
          <li className="menu-item">
            <Link to="">
              <FontAwesomeIcon icon={faUser} className="menu-icon" />
              <span>멤버</span>
            </Link>
          </li>
          {*/}
          <li className="menu-item">
            <Link to="/markdown">
              <FontAwesomeIcon icon={faFileLines} className="menu-icon" />
              <span>페이지</span>
            </Link>
          </li>
          <li className="menu-item">
            <Link to="">
              <FontAwesomeIcon icon={faCalendarDays} className="menu-icon" />
              <span>캘린더</span>
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/messenger">
              <FontAwesomeIcon icon={faComments} className="menu-icon" />
              <span>다이렉트 메시지</span>
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/article">
              <FontAwesomeIcon icon={faClipboard} className="menu-icon" />
              <span>게시판</span>
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/project">
              <FontAwesomeIcon icon={faPenToSquare} className="menu-icon" />
              <span>프로젝트</span>
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/drive">
              <FontAwesomeIcon icon={faHardDrive} className="menu-icon" />
              <span>드라이브</span>
            </Link>
          </li>
          <li className="menu-item">
            <Link to="">
              <FontAwesomeIcon icon={faTrashCan} className="menu-icon" />
              <span>휴지통</span>
            </Link>
          </li>
          <li className="menu-item"></li>
          <li className="menu-item"></li>
          <li className="menu-item"></li>
          <li className="menu-item">
            <Link to="/plan/upgrade">
              <FontAwesomeIcon
                icon={faWandMagicSparkles}
                className="menu-icon"
              />
              <span>플랜 업그레이드</span>
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/setting/myinfo">
              <FontAwesomeIcon icon={faGears} className="menu-icon" />
              <span>환경설정</span>
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/logout">
              <FontAwesomeIcon
                icon={faRightFromBracket}
                className="menu-icon"
              />
              <span>로그아웃</span>
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  );
};
