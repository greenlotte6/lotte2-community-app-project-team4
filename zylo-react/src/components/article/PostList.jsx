import React, { useState, useEffect, useRef } from "react";
import "../../styles/article/PostList.css";
import { useTheme } from "../../contexts/ThemeContext";
import DropdownPortal from "./DropdownPortal";
import { Pagination } from "./Pagination";
import { CommentForm } from "./CommentForm";
import { Modal } from "./Modal";
import "../../styles/header.css";
import { SideMenu } from "./SideMenu";
import { getArticles } from "../../api/articleAPI";


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

  const [posts, setPosts] = useState([]);


  const handleModalSubmit = (data)=>{
    console.log("모달 제출 데이터: ", data);
    setModalTitle(data.title);
    setModalSubtitle(data.subtitle);
    setModalContent(data.content);
    closeModal();
  };

  
  const dummyPosts = [
  {
    id: 1,
    icon: "https://cdn-icons-png.flaticon.com/512/1946/1946429.png",
    title: "첫 번째 게시글",
    subtitle: "리액트 게시판 더미 데이터 예시",
    views: 123,
    date: "2025-06-16",
    author: "홍길동",
    contentTitle: "첫 번째 게시글 내용",
    content: "이것은 첫 번째 더미 게시글의 내용입니다. 게시판 구현 테스트용입니다.",
    comments: [
      {
        author: "김철수",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        date: "2025-06-16",
        content: "첫 번째 게시글에 대한 댓글입니다.",
      },
      {
        author: "이영희",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        date: "2025-06-16",
        content: "잘 작성된 게시글이네요!",
      },
    ],
  },
  {
    id: 2,
    icon: "https://cdn-icons-png.flaticon.com/512/1946/1946488.png",
    title: "두 번째 게시글",
    subtitle: "두 번째 더미 게시글입니다.",
    views: 456,
    date: "2025-06-15",
    author: "박민수",
    contentTitle: "두 번째 게시글 내용",
    content: "두 번째 게시글의 내용 예시입니다. 테스트용 댓글도 포함되어 있습니다.",
    comments: [
      {
        author: "최지우",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
        date: "2025-06-15",
        content: "댓글 남겨봅니다!",
      },
    ],
  },
];

  useEffect(() => {

    getArticles()
    .then((data) => {
      if (data) setPosts(dummyPosts);
    })
      .catch((error)=>{
        console.log("게시글 조회 실패:", error);
      });


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
