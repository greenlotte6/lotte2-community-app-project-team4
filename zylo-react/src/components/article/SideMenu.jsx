import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";


export const SideMenu = () => {
  const { toggled } = useTheme();
  return (
    <aside id="article-side-menu" className={toggled ? "dark" : ""}>
      <span className="menu-divider">
        <h3>Product 팀</h3>
        <FontAwesomeIcon icon={faTrashCan} />
      </span>

      <div className="search-box">
      <img className="search-icon"
        src="/images/article/icons8-돋보기-50.png"
        alt="검색"
      />
      <input className="search-input"
        type="text"
        placeholder=" 검색"
      />
      </div>

      <ul className="category">
        <li className={toggled ? "category-item dark" : "category-item"}>
          <span>
            <img src="/images/profile_sample.jpg" alt="" />
            <Link to="/article/list">공지사항</Link>
          </span>
          <h4 className="total-count">12</h4>
        </li>
        <li className={toggled ? "category-item dark" : "category-item"}>
          <span>
            <img src="/images/profile_sample.jpg" alt="" />
            <Link to="/article/list">결재</Link>
          </span>
          <h4 className="total-count">12</h4>
        </li>
      </ul>
    </aside>
  );
};
