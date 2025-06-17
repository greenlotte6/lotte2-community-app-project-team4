import "../../styles/article/PostList.css";
import React, { useRef } from "react";

export const Modal = ({
  visible,
  onClose,
  title,
  setTitle,
  subtitle,
  setSubtitle,
  content,
  setContent,
  onSubmit,
}) => {
  const editorRef = useRef(null);

  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  const insertTable = () => {
    const editor = editorRef.current;
    editor.focus();

    const tableHTML = `
      <table style="width:100%; border-collapse:collapse; border:1px solid #ccc;">
        <thead>
          <tr>
            <th style="border:1px solid #ccc; padding:5px;"></th>
            <th style="border:1px solid #ccc; padding:5px;"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border:1px solid #ccc; padding:5px;"></td>
            <td style="border:1px solid #ccc; padding:5px;"></td>
          </tr>
        </tbody>
      </table><br/>
    `;

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const tempElement = document.createElement("div");
    tempElement.innerHTML = tableHTML;

    const frag = document.createDocumentFragment();
    let node, lastNode;

    while ((node = tempElement.firstChild)) {
      lastNode = frag.appendChild(node);
    }

    range.deleteContents();
    range.insertNode(frag);

    if (lastNode) {
      range.setStartAfter(lastNode);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  if (!visible) return null;

  // contentEditable에서 입력 시 상태 업데이트 함수
  const handleInput = () => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>새 글 작성</h3>
          <span className="modal-close" onClick={onClose}>
            &times;
          </span>
        </div>

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
            <button type="button" onClick={() => formatText("bold")}>
              <b>B</b>
            </button>
            <button type="button" onClick={() => formatText("italic")}>
              <i>I</i>
            </button>
            <button type="button" onClick={() => formatText("underline")}>
              <u>U</u>
            </button>
            <select onChange={(e) => formatText("fontSize", e.target.value)}>
              <option value="3">보통</option>
              <option value="1">작게</option>
              <option value="5">크게</option>
            </select>
            <input
              type="color"
              onChange={(e) => formatText("foreColor", e.target.value)}
            />
            <button type="button" onClick={insertTable}>
              표
            </button>
          </div>

          <div
            className="content-editor"
            contentEditable
            ref={editorRef}
            dangerouslySetInnerHTML={{ __html: content }}
            onInput={handleInput}
          />
        </div>

        <div className="modal-footer">
          <div className="file-upload">
            <label htmlFor="fileInput" className="file-button">
              📎 파일 업로드
            </label>
            <input id="fileInput" type="file" style={{ display: "none" }} />
          </div>

          <button type="button" className="btn-cancel" onClick={onClose}>
            취소
          </button>

          <button
            type="button"
            className="btn-submit"
            onClick={() =>
              onSubmit({ title, subtitle, content: editorRef.current.innerHTML })
            }
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
};
