import React, { useState, useEffect, useRef } from "react";
import "../../styles/article/PostList.css";
import { useTheme } from "../../contexts/ThemeContext";
import DropdownPortal from "./DropdownPortal";
import { Pagination } from "./Pagination";
import { CommentForm } from "./CommentForm";
import { Modal } from "./Modal";
import "../../styles/header.css";
import { SideMenu } from "./SideMenu";

const posts = [
  {
    id: 1,
    icon: "/images/article/favicon.png",
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

export default function PostList() {
  const [expandedId, setExpandedId] = useState(null);
  const { toggled } = useTheme();
  const [menuOpen, setMenuOpen] = useState({});
  const [commentMenuOpen, setCommentMenuOpen] = useState({});
  const [commentingId, setCommentingId] = useState(null);
  const btnRefs = useRef({});
  const commentBtnRefs = useRef({});

  const [modalTitle, setModalTitle] = useState("");
  const [modalSubtitle, setModalSubtitle] = useState("");
  const [modalContent, setModalContent] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);
  const openModal = () => setIsModalVisible(true);
  const closeModal = ()=> setIsModalVisible(false);



  const handleModalSubmit = (data)=>{
    console.log("모달 제출 데이터: ", data);
    setModalTitle(data.title);
    setModalSubtitle(data.subtitle);
    setModalContent(data.content);
    closeModal();
  };

  useEffect(() => {
    const handleOutside = (e) => {
      Object.entries(btnRefs.current).forEach(([id, ref]) => {
        if (ref && !ref.contains(e.target)) {
          setMenuOpen((prev) => ({ ...prev, [id]: false }));
        }
      });
      Object.entries(commentBtnRefs.current).forEach(([key, ref]) => {
        if (ref && !ref.contains(e.target)) {
          setCommentMenuOpen((prev) => ({ ...prev, [key]: false }));
        }
      });
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);

  }, []);




  const toggleExpand = (id) => {
    if (expandedId === id) {
      setExpandedId(null);
      setCommentingId(null);
    } else {
      setExpandedId(id);
    }
  };

  const toggleMenu = (id, e) => {
    e.stopPropagation();
    setMenuOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleCommentMenu = (key, e) => {
    e.stopPropagation();
    setCommentMenuOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCommentClick = (id) => {
    setCommentingId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="list">
      <h1 className="list-title">목록</h1>
      <div style={{ position: "relative", display: "inline-block" }}>
      
    
</div>
      <button className="write-btn" onClick={openModal}>글쓰기+</button>

      {posts.map((post) => {
        const isExpanded = post.id === expandedId;
        const isMenuShown = menuOpen[post.id];

        return (
          <div
            key={post.id}
            className={`content-item ${post.id === 1 ? "featured-item" : ""} ${
              isExpanded ? "expanded" : ""
            }`}
          >
            <div
              className={`item-header ${isExpanded ? "expanded-header" : ""} ${
                toggled ? "dark" : "light"
              }`}
              onClick={() => toggleExpand(post.id)}
            >
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

                <button
                  className="menu-btn"
                  onClick={(e) => toggleMenu(post.id, e)}
                  ref={(el) => (btnRefs.current[post.id] = el)}
                >
                  ⋯
                </button>

                {isMenuShown && btnRefs.current[post.id] && (
                  <DropdownPortal targetRef={{ current: btnRefs.current[post.id] }}>
                    <div className="dropdown-menu show">
                      <button className="dropdown-item edit-btn">✏️ 수정</button>
                      <button className="dropdown-item delete-btn">🗑️ 삭제</button>
                    </div>
                  </DropdownPortal>
                )}

                <span className="expand-icon">▼</span>
              </div>
            </div>

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

              <div className="comments-section">
                <h5 className="comments-title">댓글 {post.comments.length}개</h5>
                <div className="comments-list">
                  {post.comments.map((c, idx) => {
                    const commentKey = `${post.id}-${idx}`;
                    const isCommentMenuShown = commentMenuOpen[commentKey];

                    return (
                      <div key={idx} className="comment-item">
                        <div className="comment-header">
                          <img src={c.avatar} alt={c.author} className="comment-avatar" />
                          <div className="comment-info">
                            <span className="comment-author">{c.author}</span>
                            <span className="comment-date">{c.date}</span>
                          </div>

                          <button
                            className="comment-menubtn"
                            onClick={(e) => toggleCommentMenu(commentKey, e)}
                            ref={(el) => (commentBtnRefs.current[commentKey] = el)}
                          >
                            ⋯
                          </button>

                          {isCommentMenuShown && commentBtnRefs.current[commentKey] && (
                            <DropdownPortal targetRef={{ current: commentBtnRefs.current[commentKey] }}>
                              <div className="dropdown-menu show">
                                <button className="dropdown-item edit-btn">✏️ 수정</button>
                                <button className="dropdown-item delete-btn">🗑️ 삭제</button>
                              </div>
                            </DropdownPortal>
                          )}
                        </div>
                        <div className="comment-content">{c.content}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="post-actions">
                <button className="action-btn" onClick={() => handleCommentClick(post.id)}>
                  {commentingId === post.id ? "닫기" : "댓글 달기"}
                </button>
                <button className="action-btn">공유하기</button>
                <button className="action-btn">업로드</button>
              </div>

              {commentingId === post.id && (
                <CommentForm avatar={post.icon} author={post.author} />
              )}
            </div>
          </div>
        );
      })}

      <Pagination />

      <Modal visible={isModalVisible}
              onClose={closeModal}
              onSubmit={handleModalSubmit}
              title={modalTitle}
              setTitle={setModalTitle}
              subtitle={modalSubtitle}
              setSubtitle={setModalSubtitle}
              content={modalContent}
              setContent={setModalContent} 
              
              />
    </div>
  );
}
