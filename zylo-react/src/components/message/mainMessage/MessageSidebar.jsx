import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "../../../contexts/ThemeContext";

export const MessageSidebar = () => {
  const { toggled } = useTheme();
  const [dmChannels, setDmChannels] = useState([]);
  const [groupChannels, setGroupChannels] = useState([]);

  useEffect(() => {
    axios
      .get("/api/channel/my", {
        params: { userId: "user123" }, // 로그인 사용자 ID
      })
      .then((res) => {
        const channels = res.data;
        const dm = channels.filter((ch) => ch.type === "DM");
        const group = channels.filter((ch) => ch.type === "GROUP");

        setDmChannels(dm);
        setGroupChannels(group);
      })
      .catch((err) => console.error("채널 목록 불러오기 실패:", err));
  }, []);

  const renderChannelItem = (channel, index) => (
    <li className={toggled ? "chat-item dark" : "chat-item"} key={channel.id || index}>
      <div className="avatar-wrapper">
        <img
          className="avatar"
          src="/images/message/avatars.png"
          alt={channel.name || "채팅방"}
        />
        <span className="online-indicator"></span>
      </div>
      <div className="chat-info">
        <div className="chat-name">{channel.name || "다이렉트 채팅"}</div>
        <div className="chat-sub">{channel.lastMessage || "..."}</div>
      </div>
      <div className="chat-meta">
        <span className="chat-time">{channel.lastTime || "오전 9:00"}</span>
        <span className="chat-status unread">{channel.unreadCount || ""}</span>
      </div>
    </li>
  );

  return (
    <>
      <section className={toggled ? "Message dark" : "Message"}>
        <header className="Message-header">
          <h1>메세지</h1>
          <p>{dmChannels.length + groupChannels.length} 메세지</p>
          <input type="text" placeholder="검색" />
        </header>

        {/* 온라인 사용자 (더미) */}
        <div className="online-now">
          <div className="online-header">
            <p>접속 중</p>
            <button id="showAllBtn">모두보기</button>
          </div>
          <div className="avatars" id="avatarList">
            {[...Array(4)].map((_, i) => (
              <div className="avatar-wrapper" key={i}>
                <img
                  src="/images/message/avatars.png"
                  alt="user"
                  className="avatar"
                />
                <span className="online-indicator"></span>
              </div>
            ))}
          </div>
        </div>

        {/* 채팅 목록 */}
        <section className="group-section">
          {/* DM 목록 */}
          <div className="project-group">
            <div className="project-header" data-toggle="group1">
              <h5 className="project-title">다이렉트 메세지</h5>
              <span className="toggle-icon">▼</span>
            </div>
            <ul className="chat-list collapsible" id="group1">
              {dmChannels.map(renderChannelItem)}
            </ul>
          </div>

          {/* 그룹 채팅 목록 */}
          <div className="project-group">
            <div className="project-header" data-toggle="group2">
              <h5 className="project-title">그룹 채팅</h5>
              <span className="toggle-icon">▼</span>
            </div>
            <ul className="chat-list collapsible" id="group2">
              {groupChannels.map(renderChannelItem)}
            </ul>
          </div>
        </section>
      </section>
    </>
  );
};
