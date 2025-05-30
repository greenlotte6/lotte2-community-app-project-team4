import { Link } from "react-router-dom";
import { MainLayout } from "../../layouts/main/MainLayout";
import "../../styles/main/main.css";

export const MainPage = () => {
  return (
    <MainLayout>
      <div className="intro">
        <section className="intro-content">
          <p>
            <span>하나의 툴로 모든 협업을 간편하게</span>
            <span>일정 관리부터 파일 공유, 채팅, 문서 작성까지</span>
            <span>팀의 모든 업무를 한 곳에서 연결하세요</span>
          </p>
          <Link to="/signup" className="signup-btn">
            지금 30일 무료 체험
          </Link>
        </section>
        <img src="/images/collaboration.jpg" alt="" className="intro-image" />
      </div>
    </MainLayout>
  );
};
