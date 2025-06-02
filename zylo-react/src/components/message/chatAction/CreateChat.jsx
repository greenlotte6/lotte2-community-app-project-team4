import React from 'react'

export const CreateChat = () => {
  return (
    <>
    <div class="modal-overlay" id="createRoomModal">
        <div class="modal-content">
            <div class="modal-header">
            <h2 class="modal-title">채팅방 만들기</h2>
            </div>

            <div class="modal-body">
            <div class="form-group">
                <input type="text" placeholder="채팅방 이름" maxlength="20" />
                <span class="char-count">0/20</span>
            </div>
            <div class="form-group">
                <select>
                <option>멤버 초대 권한</option>
                <option>전체 멤버 가능</option>
                <option>같은 부서만 가능</option>
                <option>친구만 가능</option>
                </select>
            </div>
            </div>
        </div>
    </div>
    </>
  )
}
