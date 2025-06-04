import React, { useState } from "react";
import CommentList from "./CommentList";

const Post = ({ post }) => {
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [comments, setComments] = useState(post.comments);

  const handleAddComment = (newComment) => {
    setComments([...comments, newComment]);
    setShowCommentForm(false);
  };

  return (
    <>
      <div className="content-item" data-post-id={post.id}>
        <div className="item-header">
          <div className="item-left">
            <div className="item-icon">
              <img
                src="/images/favicon.png"
                alt={post.author}
                style={{ width: "52px" }}
              />
            </div>
            <div className="item-info">
              <h3>{post.author}</h3>
              <p>{post.group}</p>
            </div>
          </div>
          <div className="item-right">
            <span className="views">{post.views} views</span>
            <div className="menu-container">
              <button className="menu-btn">⋯</button>
            </div>
          </div>
        </div>
        <div className="post-detail">
          <div className="post-meta">
            <div className="post-date">📅 {post.date}</div>
            <div className="post-author">👤 {post.author}</div>
          </div>
          <div className="post-content">
            <h4>{post.title}</h4>
            <p>{post.content}</p>
          </div>
          <CommentList comments={comments} onAddComment={handleAddComment} />
          <div className="post-actions">
            <button className="action-btn primary">좋아요 👍</button>
            <button
              className="action-btn"
              onClick={() => setShowCommentForm(!showCommentForm)}
            >
              댓글 달기
            </button>
            <button className="action-btn">공유하기</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
