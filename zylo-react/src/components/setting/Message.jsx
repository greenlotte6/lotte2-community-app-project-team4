import React from "react";
import "../../styles/setting/message.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../contexts/ThemeContext";

export const Message = () => {
  const { toggled, toggle } = useTheme();
  return (
    <>
      <form class="content-wrapper message-setting">
        <div class="setting-content-title">
          <span>
            <FontAwesomeIcon icon={faComments} className="menu-icon" />
          </span>
          메세지 설정
        </div>
        <div class="setting-item">
          <div class="setting-item-title">메세지 수신 설정</div>
          <div class="setting-item-subtitle">
            메세지 받는 방식을 설정합니다.
          </div>
          <div class="setting-item-control message-item-control">
            <label>
              <input
                type="radio"
                class="setting-item-radio"
                name="messageReceive"
              />
              예
            </label>
            <br />
            <label>
              <input
                type="radio"
                class="setting-item-radio"
                name="messageReceive"
              />
              아니오
            </label>
          </div>
        </div>
        <div class="setting-item">
          <div class="setting-item-title">알림 설정</div>
          <div class="setting-item-subtitle">메세지 알림을 설정합니다.</div>
          <div class="setting-item-control message-item-control">
            <label>
              <input
                type="radio"
                class="setting-item-radio"
                name="notification"
              />
              예
            </label>
            <br />
            <label>
              <input
                type="radio"
                class="setting-item-radio"
                name="notification"
              />
              아니오
            </label>
          </div>
        </div>
        <div class="setting-item">
          <div class="setting-item-title">자동 응답 메세지</div>
          <div class="setting-item-subtitle">
            부재중일때 자동으로 발송될 메세지를 설정합니다.
          </div>
          <div class="setting-item-control message-item-control">
            <textarea
              class="setting-item-textarea"
              placeholder="자동 응답 메세지를 입력하세요."
            ></textarea>
          </div>
        </div>
        <div class="setting-item">
          <div class="setting-item-title">읽음 확인 허용</div>
          <div class="setting-item-subtitle">
            상대방에게 메세지 읽음 상태를 표시할지 설정합니다.
          </div>
          <div class="setting-item-control message-item-control">
            <label>
              <input
                type="radio"
                class="setting-item-radio"
                name="readReceipt"
              />
              예
            </label>
            <br />
            <label>
              <input
                type="radio"
                class="setting-item-radio"
                name="readReceipt"
              />
              아니오
            </label>
          </div>
        </div>
        <div class="submit-wrapper">
          <input
            type="submit"
            className={`myinfo-table-submit ${toggled ? "dark" : "light"}`}
            value="저장"
          ></input>
        </div>
      </form>
    </>
  );
};
