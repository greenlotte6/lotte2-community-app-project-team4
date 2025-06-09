import React from "react";
import "../../styles/article/PostList.css";

export const CommentList = () => {
  const sampleComments = [
    {
      author: "홍길동",
      date: "2025-06-09",
      avatar: "/images/favicon.png",
      content: "정말 유익한 글이네요!",
    },
    {
      author: "이몽룡",
      date: "2025-06-08",
      avatar: "/images/favicon.png",
      content: "저도 같은 생각입니다. 감사합니다!",
    },
  ];

  const currentUser = {
    name: "성춘향",
    avatar: "/images/favicon.png",
  };

  return (
    <div className="comments-section">
      <h5 className="comments-title">댓글 {sampleComments.length}개</h5>
      <div className="comments-list">
        {sampleComments.map((comment, idx) => (
          <div key={idx} className="comment-item">
            <div className="comment-header">
              <img
                src={comment.avatar}
                alt={comment.author}
                className="comment-avatar"
              />
              <div className="comment-info">
                <span className="comment-author">{comment.author}</span>
                <span className="comment-date">{comment.date}</span>
              </div>
              <div className="comment-menubtn">⋯</div>
            </div>
            <div className="comment-content">{comment.content}</div>
          </div>
        ))}
      </div>

      {/* 댓글 등록 폼 */}
      <div className="comment-form">
        <div className="comment-form-header">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="comment-avatar"
          />
          <span className="comment-author">{currentUser.name}</span>
        </div>
        <textarea
          className="comment-input"
          placeholder="댓글을 입력하세요..."
        ></textarea>
        <div className="comment-form-actions">
          <button className="comment-submit-btn">댓글 등록</button>
          <button className="comment-cancel-btn">취소</button>
        </div>
      </div>
    </div>
  );
};
