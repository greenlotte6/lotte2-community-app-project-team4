import React, { useState, useEffect, useRef } from "react";
import "../../styles/article/PostList.css";

/* ────────── 예시 데이터 ────────── */
const posts = [
  {
    id: 1,
    icon: "/images/article/favicon.png",     // public/images 기준
    title: "zyla",
    subtitle: "4조",
    views: 24,
    date: "2024년 12월 15일",
    author: "zyla",
    contentTitle: "4조 프로젝트 진행 상황",
    content: "진행중",
    comments: [
      {
        author: "김철수",
        date: "2025년 06월 02일 14:30",
        content: "프로젝트 진행 상황이 궁금하네요!",
        avatar: "/images/article/favicon.png",
      },
    ],
  },
  {
    id: 2,
    icon: "/images/article/liverpool.png",
    title: "리버풀fc",
    subtitle: "내년 챔스 우승 하는 법",
    views: 24,
    date: "2024년 12월 14일",
    author: "리버풀fc",
    contentTitle: "리버풀 챔피언스리그 우승 전략",
    content: "비르츠",
    comments: [
      {
        author: "클롭",
        date: "2025년 06월 03일 15:00",
        content: "인정",
        avatar: "/images/article/liverpool.png",
      },
    ],
  },
  {
    id: 3,
    icon: "/images/article/123123123.png",
    title: "CatOffice",
    subtitle: "야옹",
    views: 24,
    date: "2024년 12월 13일",
    author: "CatOffice",
    contentTitle: "고양이",
    content: "야옹",
    comments: [
      {
        author: "김야옹",
        date: "2025년 06월 02일 14:30",
        content: "야옹",
        avatar: "/images/article/123123123.png",
      },
    ],
  },
];

/* ────────── PostList ────────── */
export default function PostList() {
  const [expandedId, setExpandedId] = useState(null);   // 글 펼침
  const [menuOpen, setMenuOpen]   = useState({});       // 드롭다운 열림
  const menuRefs                  = useRef({});         // 메뉴 DOM

  /* 외부 클릭 시 드롭다운 닫기 */
  useEffect(() => {
    const handleOutside = (e) => {
      Object.entries(menuRefs.current).forEach(([id, ref]) => {
        if (ref && !ref.contains(e.target)) {
          setMenuOpen((prev) => ({ ...prev, [id]: false }));
        }
      });
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  /* 토글 함수 */
  const toggleExpand = (id) =>
    setExpandedId((prev) => (prev === id ? null : id));

  const toggleMenu = (id, e) => {
    e.stopPropagation();
    setMenuOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="list">
      <h1 className="list-title">목록</h1>

      {posts.map((post) => {
        const isExpanded  = post.id === expandedId;
        const isMenuShown = menuOpen[post.id];

        return (
          <div
            key={post.id}
            className={`content-item ${post.id === 1 ? "featured-item" : ""} ${
              isExpanded ? "expanded" : ""
            }`}
          >
            {/* ────── 헤더 ────── */}
            <div className="item-header" onClick={() => toggleExpand(post.id)}>
              <div className="item-left">
                <div className="item-icon">
                  <img src={post.icon} alt={post.title} style={{ width: "40px" }} />
                </div>
                <div className="item-info">
                  <h3>{post.title}</h3>
                  <p>{post.subtitle}</p>
                </div>
              </div>

              <div className="item-right">
                <span className="views">{post.views} views</span>

                {/* ⋯ 드롭다운 */}
                <div
                  className="menu-container"
                  ref={(el) => (menuRefs.current[post.id] = el)}
                >
                  <button className="menu-btn" onClick={(e) => toggleMenu(post.id, e)}>
                    ⋯
                  </button>

                  <div className={`dropdown-menu ${isMenuShown ? "show" : ""}`}>
                    <button className="dropdown-item edit-btn">✏️ 수정</button>
                    <button className="dropdown-item delete-btn">🗑️ 삭제</button>
                  </div>
                </div>

                <span className="expand-icon">▼</span>
              </div>
            </div>

            {/* ────── 상세 영역 ────── */}
            <div
              className="post-detail"
              style={{
                maxHeight: isExpanded ? "1000px" : "0",
                padding: isExpanded ? "15px 30px" : "0 30px",
              }}
            >
              <div className="post-meta">
                <div className="post-date">📅 {post.date}</div>
                <div className="post-author">👤 {post.author}</div>
              </div>

              <div className="post-content">
                <h4>{post.contentTitle}</h4>
                <p>{post.content}</p>
              </div>

              {/* 댓글 영역 유지 */}
              <div className="comments-section">
                <h5 className="comments-title">댓글 {post.comments.length}개</h5>
                <div className="comments-list">
                  {post.comments.map((c, idx) => (
                    <div key={idx} className="comment-item">
                      <div className="comment-header">
                        <img src={c.avatar} alt={c.author} className="comment-avatar" />
                        <div className="comment-info">
                          <span className="comment-author">{c.author}</span>
                          <span className="comment-date">{c.date}</span>
                        </div>
                        <div className="comment-menubtn">⋯</div>
                      </div>
                      <div className="comment-content">{c.content}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 액션 버튼도 유지 */}
              <div className="post-actions">
                <button className="action-btn primary">좋아요 👍</button>
                <button className="action-btn">댓글 달기</button>
                <button className="action-btn">공유하기</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
