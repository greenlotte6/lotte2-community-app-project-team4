import React from "react";
import "../../styles/article/PostList.css";

export const CommentForm = ({ avatar, author }) => {
  return (
    <form className="comment-form">
      <div className="comment-form-header">
        <img
          src={avatar || "/images/article/liverpool.png"} // 없으면 기본 이미지
          alt={author || "사용자 이름"}
          className="comment-avatar"
          style={{ width: "40px", borderRadius: "50%" }}
        />
        <span className="comment-author">{author || "사용자 이름"}</span>
      </div>

      <textarea
        className="comment-input"
        placeholder="댓글을 입력하세요..."
      />

      <div className="comment-form-actions">
        <button type="submit" className="comment-submit-btn">
          댓글 등록
        </button>
      </div>
    </form>
  );
};
