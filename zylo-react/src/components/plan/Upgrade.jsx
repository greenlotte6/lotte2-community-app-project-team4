import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";

export const Upgrade = () => {
  const { toggled } = useTheme();
  return (
    <div id="plan-container">
      <h3 className="title">플랜 업그레이드</h3>
      <section id="upgrade-container">
        <div className={toggled ? "plan dark" : "plan"}>
          <h3>Free</h3>
          <span className="price">0원</span>
          <Link to="" className="purchase-btn disabled">
            현재 플랜
          </Link>
          <ul>
            <li>드라이브 용량 1GB, 파일 최대 5MB 업로드</li>
            <li>프로젝트 최대 3개</li>
            <li>프로젝트 협업자 최대 5명 추가 가능</li>
            <li>최대 3명과 DM 가능</li>
            <li>게시판 최대 3개 추가 가능</li>
            <li>페이지 공유 멤버 최대 3명</li>
          </ul>
        </div>
        <div className={toggled ? "plan plus dark" : "plan plus"}>
          <h3>Plus</h3>
          <span className="price">월 99,000원</span>
          <Link to="/plan/orderSheet" className="purchase-btn">
            구독하기
          </Link>
          <ul>
            <li>드라이브 용량 2GB, 무제한 파일 업로드</li>
            <li>프로젝트 무제한</li>
            <li>프로젝트 협업자 최대 15명 추가 가능</li>
            <li>DM 무제한</li>
            <li>게시판 무제한</li>
            <li>페이지 최대 10명</li>
          </ul>
        </div>
      </section>
    </div>
  );
};
