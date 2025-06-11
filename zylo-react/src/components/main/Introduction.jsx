import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export const Introduction = () => {
  useEffect(() => {
    alert("버전: 0.0.4");
  });
  return (
    <div id="intro" className="intro content-page">
      <section className="intro-content">
        <p>
          <span>하나의 툴로 모든 협업을 간편하게</span>
          <span>일정 관리부터 파일 공유, 채팅, 문서 작성까지</span>
          <span>팀의 모든 업무를 한 곳에서 연결하세요</span>
          <span>툴에 적응하지 마세요.</span>
          <span>당신의 팀워크에 자연스럽게 녹아드는 경험을 제공합니다.</span>
          <span>간편하지만 강력하게, 필요한 기능만 깔끔하게 담았습니다.</span>
          <span>이제 협업은 복잡하지 않아도 됩니다.</span>
        </p>
        <Link to="/signup" className="signup-btn">
          지금 30일 무료 체험
        </Link>
      </section>
      <img src="/images/collaboration.jpg" alt="" className="intro-image" />
    </div>
  );
};
