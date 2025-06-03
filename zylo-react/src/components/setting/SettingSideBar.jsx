import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faFileLines,
  faCalendarDays,
  faComments,
  faClipboard,
  faPenToSquare,
  faHardDrive,
  faUser,
  faPortrait,
} from "@fortawesome/free-solid-svg-icons";
import MyInfo from "./MyInfo";
import { Link } from "react-router-dom";

const SettingSideBar = () => {
  const { toggled, toggle } = useTheme();

  return (
    <>
      <aside id="setting-side-bar" className={toggled ? "dark" : "light"}>
        <div id="setting-side-header">
          <span>
            <FontAwesomeIcon icon={faGear} className="menu-icon" />
          </span>
          설정
        </div>
        <nav aria-label="계정 설정">
          <div className="setting-title">계정</div>
          <ul className="setting-menu">
            <Link to="/setting/MyInfo">
              <li className={toggled ? "dark" : "light"}>
                <span>
                  <FontAwesomeIcon icon={faUser} className="menu-icon" />
                </span>
                내 정보
              </li>
            </Link>
            <Link to="/setting/Profile">
              <li className={toggled ? "dark" : "light"}>
                <span>
                  <FontAwesomeIcon icon={faPortrait} className="menu-icon" />
                </span>
                프로필 수정
              </li>
            </Link>
          </ul>
        </nav>
        <nav aria-label="워크스페이스 설정">
          <div className="setting-title">워크스페이스</div>
          <ul className="setting-menu">
            <Link to="/setting/page">
              <li className={toggled ? "dark" : "light"}>
                <span>
                  <FontAwesomeIcon icon={faFileLines} className="menu-icon" />
                </span>
                페이지
              </li>
            </Link>
            <Link to="/setting/calendar">
              <li className={toggled ? "dark" : "light"}>
                <span>
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    className="menu-icon"
                  />
                </span>
                캘린더
              </li>
            </Link>
            <Link to="/setting/message">
              <li className={toggled ? "dark" : "light"}>
                <span>
                  <FontAwesomeIcon icon={faComments} className="menu-icon" />
                </span>
                메세지
              </li>
            </Link>
            <Link to={"/setting/article"}>
              <li className={toggled ? "dark" : "light"}>
                <span>
                  <FontAwesomeIcon icon={faClipboard} className="menu-icon" />
                </span>
                게시판
              </li>
            </Link>
            <Link to="/setting/project">
              <li className={toggled ? "dark" : "light"}>
                <span>
                  <FontAwesomeIcon icon={faPenToSquare} className="menu-icon" />
                </span>
                프로젝트
              </li>
            </Link>
            <Link to="/setting/drive">
              <li className={toggled ? "dark" : "light"}>
                <span>
                  <FontAwesomeIcon icon={faHardDrive} className="menu-icon" />
                </span>
                드라이브
              </li>
            </Link>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default SettingSideBar;
