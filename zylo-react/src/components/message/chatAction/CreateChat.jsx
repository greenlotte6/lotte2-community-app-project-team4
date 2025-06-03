import React, { useRef, useEffect } from 'react';

export const CreateChat = ({ onClose, onMakeChat }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" id="createRoomModal">
      <div className="modal-content" ref={modalRef}>
        <div className="modal-header">
          <h2 className="modal-title">채팅방 만들기</h2>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <input type="text" placeholder="채팅방 이름" maxLength="20" />
            <span className="char-count">0/20</span>
          </div>
          <div className="form-group">
            <select>
              <option>멤버 초대 권한</option>
              <option>전체 멤버 가능</option>
              <option>같은 부서만 가능</option>
              <option>친구만 가능</option>
            </select>
          </div>
          <div className="modal-footer">
            <button onClick={onClose}>취소</button>
            <button onClick={onMakeChat}>만들기</button> 
          </div>
        </div>
      </div>
    </div>
  );
};
