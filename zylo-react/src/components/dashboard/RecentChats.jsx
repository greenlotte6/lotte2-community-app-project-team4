import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { DashboardChatRoom } from "../dashboard/DashboardChatRoom";
import { ChatRoomInput } from "../message/mainMessage/ChatRoomInput";
import { useState } from "react";

export const RecentChats = () => {
  const [hidden, setHidden] = useState(true);

  const handleClick = (e) => {
    e.preventDefault();
    alert("[TODO] Websocket 연결하여 최근 대화 내역 가져오기");
    setHidden(false);
  };

  return (
    <section className="dashboard">
      <div className="dashboard-title">
        <FontAwesomeIcon icon={faComment} />
        <span>최근 다이렉트 메시지</span>
      </div>
      <div id="chatrooms">
        <Link
          to="/chatroom?id=1"
          className={"card chatroom"}
          onClick={handleClick}
        >
          1
        </Link>
        <Link
          to="/chatroom?id=1"
          className={"card chatroom"}
          onClick={handleClick}
        >
          2
        </Link>
        <Link
          to="/chatroom?id=1"
          className={"card chatroom"}
          onClick={handleClick}
        >
          3
        </Link>
        <Link
          to="/chatroom?id=1"
          className={"card chatroom"}
          onClick={handleClick}
        >
          4
        </Link>
        <Link
          to="/chatroom?id=1"
          className={"card chatroom"}
          onClick={handleClick}
        >
          5
        </Link>
      </div>
      <div id="display" className={hidden ? "hidden" : ""}>
        <DashboardChatRoom />
        <ChatRoomInput />
      </div>
    </section>
  );
};
