import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faChevronLeft,
  faChevronRight,
  faClipboard,
  faComments,
  faFileLines,
  faHardDrive,
  faHome,
  faPenToSquare,
  faTrashCan,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export const SideBar = () => {
  return (
    <div id="side-container">
      <aside id="side-bar">
        <header>
          <div className="buttons">
            <FontAwesomeIcon icon={faHome} className="home-btn" />
            <div className="move-btns">
              <FontAwesomeIcon icon={faChevronLeft} className="move-btn left" />
              <FontAwesomeIcon
                icon={faChevronRight}
                className="move-btn right"
              />
            </div>
          </div>
        </header>

        <ul className="menu">
          <li className="menu-item">
            <Link to="">
              <FontAwesomeIcon icon={faHome} className="menu-icon" />
              <span>홈</span>
            </Link>
          </li>
          <li className="menu-item">
            <Link to="">
              <FontAwesomeIcon icon={faUser} className="menu-icon" />
              <span>멤버</span>
            </Link>
          </li>
          <li className="menu-item">
            <Link to="">
              <FontAwesomeIcon icon={faFileLines} className="menu-icon" />
              <span>페이지</span>
            </Link>
          </li>
          <li className="menu-item">
            <FontAwesomeIcon icon={faCalendarDays} className="menu-icon" />
            <a>캘린더</a>
          </li>
          <li className="menu-item">
            <FontAwesomeIcon icon={faComments} className="menu-icon" />
            <a>다이렉트 메시지</a>
          </li>
          <li className="menu-item">
            <FontAwesomeIcon icon={faClipboard} className="menu-icon" />
            <a>게시판</a>
          </li>
          <li className="menu-item">
            <FontAwesomeIcon icon={faPenToSquare} className="menu-icon" />
            <a>프로젝트</a>
          </li>
          <li className="menu-item">
            <FontAwesomeIcon icon={faHardDrive} className="menu-icon" />
            <a>드라이브</a>
          </li>
          <li className="menu-item">
            <FontAwesomeIcon icon={faTrashCan} className="menu-icon" />
            <a>휴지통</a>
          </li>
        </ul>
      </aside>
    </div>
  );
};
