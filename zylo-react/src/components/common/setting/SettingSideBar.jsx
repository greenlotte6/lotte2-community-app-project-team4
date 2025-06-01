import React from "react";

const SettingSideBar = () => {
  return (
    <div id="setting-side-container">
      <aside id="setting-side-bar">
        <div id="setting-side-header">설정</div>
        <nav aria-label="계정 설정">
          <div class="setting-title">계정</div>
          <ul class="setting-menu">
            <li>내 정보</li>
            <li>프로필 수정</li>
          </ul>
        </nav>
        <nav aria-label="워크스페이스 설정">
          <div class="setting-title">워크스페이스</div>
          <ul class="setting-menu">
            <li>페이지</li>
            <li>일정</li>
            <li>메세지</li>
            <li>게시판</li>
            <li>프로젝트</li>
            <li>드라이브</li>
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default SettingSideBar;
