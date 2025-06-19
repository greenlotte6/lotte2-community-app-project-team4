import { useTheme } from "../../../contexts/ThemeContext";
import { useEffect, useState } from "react";
import axios from "axios";

export const MessageSidebar = ({
  channels,
  selectedChannel,
  onSelectChannel,
}) => {
  const { toggled } = useTheme();
  const [userId, setUserId] = useState(null);
  const [friends, setFriends] = useState([]);

  // 유저 ID 가져오기
  useEffect(() => {
    axios
      .get("http://localhost:8082/v1/user", { withCredentials: true })
      .then((res) => setUserId(res.data.id))
      .catch((err) => console.error("유저 정보 오류:", err));
  }, []);

  // 친구 목록 가져오기
  useEffect(() => {
    if (!userId) return;

    const fetchFriends = async () => {
      try {
        const idRes = await axios.get("http://localhost:8080/channel/friends", {
          params: { userId },
        });

        const friendIds = idRes.data;

        if (!Array.isArray(friendIds) || friendIds.length === 0) {
          setFriends([]);
          return;
        }

        // const userRes = await axios.post(
        //   "http://localhost:8082/v1/user",
        //   friendIds,
        //   {
        //     withCredentials: true,
        //   }
        // );

        // if (Array.isArray(userRes.data)) {
        //   setFriends(userRes.data);
        // }
      } catch (e) {
        console.error("친구 정보 가져오기 실패: ", e);
      }
    };

    fetchFriends();
  }, [userId]);

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
      </div>
    </li>
  );

  return (
    <section className={toggled ? "Message dark" : "Message"}>
      <header className="Message-header">
        <h1>메세지</h1>
        <input type="text" placeholder="검색" />
      </header>

      {/* 친구 목록 */}
      <div className="online-now">
        <div className="online-header">
          <p>친구 목록</p>
          <button id="showAllBtn">모두보기</button>
        </div>
        <div className="avatars" id="avatarList">
          {friends.map((friend, i) => (
            <div
              className="avatar-wrapper"
              key={friend.uid || i}
              title={friend.name}
            >
              <img
                src={`/images/profiles/${friend.profileImageId || 0}.png`}
                alt={friend.name}
                className="avatar"
              />
              <span className="online-indicator"></span>
            </div>
          ))}
        </div>
      </div>

      {/* 채팅 목록 */}
      <section className="group-section">
        <div className="project-group">
          <div className="project-header">
            <h5 className="project-title">다이렉트 메세지</h5>
            <span className="toggle-icon">▼</span>
          </div>
          <ul className="chat-list collapsible">
            {dmChannels.map(renderChannelItem)}
          </ul>
        </div>

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
  );
};
