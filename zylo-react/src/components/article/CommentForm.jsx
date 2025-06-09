import "../../styles/article/PostList.css";

export const CommentForm = () => {
  return (
    <form className="comment-form">
      <div className="comment-form-header">
        <img
          src="/images/favicon.png"
          alt="기본 사용자"
          className="comment-avatar"
        />
        <span className="comment-author">사용자 이름</span>
      </div>
      <textarea
        className="comment-input"
        placeholder="댓글을 입력하세요..."
      />
      <div className="comment-form-actions">
        <button type="submit" className="comment-submit-btn">
          댓글 등록
        </button>
        <button type="button" className="comment-cancel-btn">
          취소
        </button>
      </div>
    </form>
  );
};
