import { useTheme } from "../../../contexts/ThemeContext";
import { useEffect } from "react";

export const MessageSidebar = ({
  channels,
  selectedChannel,
  onSelectChannel,
}) => {
  const { toggled } = useTheme();

  useEffect(() => {
    const storedChannelId = localStorage.getItem("selectedChannelId");
    if (storedChannelId && channels.length > 0) {
      const channelToSelect = channels.find(
        (channel) => channel.id === storedChannelId
      );
      if (channelToSelect) {
        onSelectChannel(channelToSelect);
      }
    } else if (!storedChannelId && channels.length > 0) {
      onSelectChannel(channels[0]);
    }
  }, [channels, onSelectChannel]);

  const dmChannels = channels.filter((ch) => ch.type === "DM");
  const groupChannels = channels.filter((ch) => ch.type === "GROUP");

  const renderChannelItem = (channel, index) => (
    <li
      className={
        (toggled ? "chat-item dark" : "chat-item") +
        (selectedChannel?.id === channel.id ? " selected" : "")
      }
      key={channel.id || index}
      onClick={() => {
        onSelectChannel(channel);
        localStorage.setItem("selectedChannelId", channel.id);
      }}
    >
      <div className="avatar-wrapper">
        <img
          className="avatar"
          src="/images/message/avatars.png"
          alt={channel.name}
        />
        <span className="online-indicator"></span>
      </div>
      <div className="chat-info">
        <div className="chat-name">{channel.name}</div>
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
            <p>즐겨찾기 목록</p>
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
            <div className="project-header">
              <h5 className="project-title">다이렉트 메세지</h5>
              <span className="toggle-icon">▼</span>
            </div>
            <ul className="chat-list collapsible">
              {dmChannels.map(renderChannelItem)}
            </ul>
          </div>

          {/* 그룹 채팅 목록 */}
          <div className="project-group">
            <div className="project-header">
              <h5 className="project-title">그룹 채팅</h5>
              <span className="toggle-icon">▼</span>
            </div>
            <ul className="chat-list collapsible">
              {groupChannels.map(renderChannelItem)}
            </ul>
          </div>
        </section>
      </section>
    </>
  );
};
