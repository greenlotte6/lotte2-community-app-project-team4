import React from 'react'

export const ChatRoomInput = () => {
  return (
    <>
    <div className="chat-room-input">
        <img src="/images/messenger/voice.png" alt="voice" />
        <img src="/images/messenger/file.png" alt="file" />
        <input type="text" placeholder="메세지 입력" />
        <button>전송</button>   
    </div>
    </>
  )
}
