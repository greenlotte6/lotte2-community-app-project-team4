import React from "react";
import "../../styles/article/PostList.css";

export const CommentItem = () => {
  return (
    <div className="comment-item">
      <div className="comment-header">
        <img
          src="/images/favicon.png"
          alt="기본 사용자"
          className="comment-avatar"
        />
        <div className="comment-info">
          <span className="comment-author">홍길동</span>
          <span className="comment-date">2025-06-09</span>
        </div>
        <div className="comment-menubtn">⋯</div>
      </div>
      <div className="comment-content">
        이건 샘플 댓글입니다. 나중에 데이터를 연동해서 바꿔주세요.
      </div>
    </div>
  );
};
