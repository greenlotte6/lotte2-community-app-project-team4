import "../../../styles/message/profile.css";

export const ChatRoomProfile = () => {
  return (
    <section id="chat-profile-container">
      <img
        src="/images/message/chatting-thumbnail.jpg"
        alt="chatting-profile"
      />
      <div>
        <h3 className="chat-room-title">Product Team</h3>
        <span className="members-status total-members">20 members &nbsp;</span>
        <span className="members-status online-members">9 online</span>
      </div>
    </section>
  );
};
