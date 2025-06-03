import React from 'react'

export const MessageSidebar = () => {
  return (
        <>
         <section className="Message">
          <header className="Message-header">
            <h1>메세지</h1>
            <p>125 메세지 - 5 안읽음</p>
            <input type="text" placeholder="검색" />
          </header>

          {/* 온라인 사용자 */}
          <div className="online-now">
            <div className="online-header">
              <p>접속 중</p>
              <button id="showAllBtn">모두보기</button>
            </div>
            <div className="avatars" id="avatarList">
              {[...Array(4)].map((_, i) => (
                <div className="avatar-wrapper" key={i}>
                  <img src="/images/message/avatars.png" alt="user" className="avatar" />
                  <span className="online-indicator"></span>
                </div>
              ))}
            </div>
          </div>

          {/* 채팅 목록 영역 */}
          <section className="group-section">
            {/* 다이렉트 메시지 */}
            <div className="project-group">
              <div className="project-header" data-toggle="group1">
                <h5 className="project-title">다이렉트 메세지</h5>
                <span className="toggle-icon">▼</span>
              </div>
              <ul className="chat-list collapsible" id="group1">
                <li className="chat-item">
                  <div className="avatar-wrapper">
                    <img
                      className="avatar"
                      src="/images/message/avatars.png"
                      alt="Robert Fox"
                    />
                    <span className="online-indicator"></span>
                  </div>
                  <div className="chat-info">
                    <div className="chat-name">Robert Fox</div>
                    <div className="chat-sub">Typing...</div>
                  </div>
                  <div className="chat-meta">
                    <span className="chat-time">10:52 AM</span>
                    <span className="chat-status typing"></span>
                  </div>
                </li>

                <li className="chat-item">
                  <div className="avatar-wrapper">
                    <img
                      className="avatar"
                      src="/images/message/avatars.png"
                      alt="Devon Lane"
                    />
                  </div>
                  <div className="chat-info">
                    <div className="chat-name">Devon Lane</div>
                    <div className="chat-sub">If we so can, tomorrow</div>
                  </div>
                  <div className="chat-meta">
                    <span className="chat-time">04:25 PM</span>
                    <span className="chat-status read"></span>
                  </div>
                </li>
              </ul>
            </div>

            {/* 그룹 채팅 */}
            <div className="project-group">
              <div className="project-header" data-toggle="group2">
                <h5 className="project-title">그룹 채팅</h5>
                <span className="toggle-icon">▼</span>
              </div>
              <ul className="chat-list collapsible" id="group2">
                <li className="chat-item">
                  <div className="avatar-wrapper">
                    <img
                      className="avatar"
                      src="/images/message/avatars.png"
                      alt="Kristin Watson"
                    />
                    <span className="online-indicator"></span>
                  </div>
                  <div className="chat-info">
                    <div className="chat-name">Kristin Watson</div>
                    <div className="chat-sub">If we so can, tomorrow</div>
                  </div>
                  <div className="chat-meta">
                    <span className="chat-time">3:12 AM</span>
                    <span className="chat-status unread">3</span>
                  </div>
                </li>

                <li className="chat-item">
                  <div className="avatar-wrapper">
                    <img
                      className="avatar"
                      src="/images/message/avatars.png"
                      alt="Courtney Henry"
                    />
                  </div>
                  <div className="chat-info">
                    <div className="chat-name">Courtney Henry</div>
                    <div className="chat-sub">If we so can, tomorrow</div>
                  </div>
                  <div className="chat-meta">
                    <span className="chat-time">1:03 AM</span>
                    <span className="chat-status read">3</span>
                  </div>
                </li>
              </ul>
            </div>
          </section>
        </section>
    </>
  )
}
