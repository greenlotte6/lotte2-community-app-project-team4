import { useState } from "react";
import Comment from "./Comment";

function CommentList({ comments, onAddComment }) {
  const [showForm, setShowForm] = useState(false);
  const [commentContent, setCommentContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentContent.trim()) return;
    const newComment = {
      id: Date.now(),
      author: "현재 사용자",
      date: new Date().toLocaleString(),
      content: commentContent,
    };
    onAddComment(newComment);
    setCommentContent("");
  };

  return (
    <div className="comments-section">
      <h5 className="comments-title">댓글 {comments.length}개</h5>
      <div className="comments-list">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
      {showForm && (
        <form onSubmit={handleSubmit} className="comment-form">
          <div className="comment-form-header">
            <img
              src="/images/favicon.png"
              alt="현재 사용자"
              className="comment-avatar"
            />
            <span className="comment-author">현재 사용자</span>
          </div>
          <textarea
            className="comment-input"
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder="댓글을 입력하세요..."
          />
          <div className="comment-form-actions">
            <button type="submit" className="comment-submit-btn">
              댓글 등록
            </button>
            <button
              type="button"
              className="comment-cancel-btn"
              onClick={() => setShowForm(false)}
            >
              취소
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
export default CommentList;
