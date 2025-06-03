import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareFromSquare } from "@fortawesome/free-solid-svg-icons";

export const ProfileLink = () => {
  return (
    <div className="nav">
      <div className="toolbar">
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
  );
};
