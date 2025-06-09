import React from "react";
import "../../styles/article/PostList.css";
import { CommentList } from "./CommentList";

export const Post = ({ post }) => {
  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="post-detail-container">
      <div className="post-header">
        <div className="post-info">
          <h2 className="post-title">{post.title}</h2>
          <div className="post-meta">
            <span className="post-author">작성자: {post.author}</span>
            <span className="post-date">작성일: {post.date}</span>
            <span className="post-views">조회수: {post.views}</span>
          </div>
        </div>
        <div className="post-menu">
          {/* 수정, 삭제 버튼 클릭 이벤트 제거 */}
          <button className="post-edit">✏️ 수정</button>
          <button className="post-delete">🗑️ 삭제</button>
        </div>
      </div>

      <div className="post-content">
        <p>{post.content}</p>
      </div>

      <div className="post-actions">
        {/* 좋아요, 공유 버튼 클릭 이벤트 제거 */}
        <button className="like-btn">👍 좋아요</button>
        <button className="share-btn">📤 공유</button>
      </div>

      {/* 댓글 목록 보여주기 (UI만) */}
      <CommentList comments={post.comments} />
    </div>
  );
};
