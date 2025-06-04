import { useState } from "react";

function WriteModal({ onAddPost, onClose }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    const newPost = {
      id: Date.now(),
      title,
      author: "현재 사용자",
      group: "새 글",
      date: new Date().toLocaleDateString(),
      content,
      comments: [],
      views: 0,
    };
    onAddPost(newPost);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-header">
          <h3>새 글 작성</h3>
          <span className="modal-close" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="modal-body">
          <input
            type="text"
            id="modalTitle"
            placeholder="제목을 입력하세요"
            className="title-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="toolbar">
            <button>
              <b>B</b>
            </button>
            <button>
              <i>I</i>
            </button>
            <button>
              <u>U</u>
            </button>
            <select>
              <option value="3">보통</option>
              <option value="1">작게</option>
              <option value="5">크게</option>
            </select>
            <input type="color" />
            <button>표</button>
          </div>
          <div
            id="modalContent"
            contentEditable
            className="content-editor"
            onInput={(e) => setContent(e.target.textContent)}
          ></div>
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>
            취소
          </button>
          <button className="btn-submit" onClick={handleSubmit}>
            등록
          </button>
        </div>
      </div>
    </div>
  );
}
export default WriteModal;
