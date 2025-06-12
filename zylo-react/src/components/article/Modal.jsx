import "../../styles/article/PostList.css";
import React, { useRef } from "react";

export const Modal = ({ visible, onClose, title, setTitle, subtitle, setSubtitle, content }) => {
  const editorRef = useRef(null);

  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  const insertTable = () => {
    const tableHTML = `<table border="1" style="width:100%; border-collapse:collapse;">
      <tr><th>헤더1</th><th>헤더2</th></tr>
      <tr><td>내용1</td><td>내용2</td></tr>
    </table><br/>`;
    document.execCommand("insertHTML", false, tableHTML);
  };

  // 제출 기능 제거
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onSubmit(editorRef.current.innerHTML);
  // };

  if (!visible) return null; // 모달이 안 보이게 처리

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>새 글 작성</h3>
          <span className="modal-close" onClick={onClose}>&times;</span>
        </div>

        {/* form 태그 제거, onSubmit도 제거 */}
        <div className="modal-body">
          <input
            type="text"
            placeholder="제목을 입력하세요"
            className="title-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="부 제목을 입력하세요"
            className="sub-title-input"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />
          <div className="toolbar">
            <button type="button" onClick={() => formatText("bold")}><b>B</b></button>
            <button type="button" onClick={() => formatText("italic")}><i>I</i></button>
            <button type="button" onClick={() => formatText("underline")}><u>U</u></button>
            <select onChange={(e) => formatText("fontSize", e.target.value)}>
              <option value="3">보통</option>
              <option value="1">작게</option>
              <option value="5">크게</option>
            </select>
            <input type="color" onChange={(e) => formatText("foreColor", e.target.value)} />
            <button type="button" onClick={insertTable}>표</button>
          </div>

          <div
            className="content-editor"
            contentEditable
            ref={editorRef}
            // onInput 삭제
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>

        <div className="modal-footer">
          <button type="button" className="btn-cancel" onClick={onClose}>취소</button>
          {/* 등록 버튼은 그냥 닫기 기능만 */}
          <button type="button" className="btn-submit" onClick={onClose}>등록</button>
        </div>
      </div>
    </div>
  );
};
