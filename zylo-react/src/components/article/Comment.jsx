function Comment({ comment }) {
  return (
    <div className="comment-item">
      <div className="comment-header">
        <img
          src="/images/favicon.png"
          alt={comment.author}
          className="comment-avatar"
        />
        <div className="comment-info">
          <span className="comment-author">{comment.author}</span>
          <span className="comment-date">{comment.date}</span>
        </div>
      </div>
      <div className="comment-content">{comment.content}</div>
    </div>
  );
}
export default Comment;
