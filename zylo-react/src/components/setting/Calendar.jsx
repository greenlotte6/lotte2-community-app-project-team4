import { faCalendarDays, faFileLines } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/setting/calendar.css";
import React from "react";
import { useTheme } from "../../contexts/ThemeContext";

const Calendar = () => {
  const { toggled, toggle } = useTheme();
  return (
    <>
      <div class="content-wrapper">
        <div class="setting-content-title">
          <span>
            <FontAwesomeIcon icon={faCalendarDays} className="menu-icon" />
          </span>
          캘린더 설정
        </div>
        <div class="setting-item">
          <div class="setting-item-title">공유 설정</div>
          <div class="setting-item-subtitle">
            캘린더 공개 범위와 편집 권한을 설정합니다.
          </div>
          <div class="setting-item-control setting-item-check">
            <input
              type="radio"
              name="privacy"
              id="private"
              class="setting-item-control-radio"
            />
            <div class="setting-item-control-info">
              <div class="setting-item-control-title">비공개</div>
              <div class="setting-item-control-subtitle">
                나만 볼 수 있습니다.
              </div>
            </div>
          </div>
          <div class="setting-item-control setting-item-check">
            <input
              type="radio"
              name="privacy"
              id="public"
              class="setting-item-control-radio"
            />
            <div class="setting-item-control-info">
              <div class="setting-item-control-title">전체 공개</div>
              <div class="setting-item-control-subtitle">
                누구나 볼 수 있습니다.
              </div>
            </div>
          </div>
        </div>
        <div class="submit-wrapper">
          <input
            type="submit"
            className={`myinfo-table-submit ${toggled ? "dark" : "light"}`}
            value="저장"
          ></input>
        </div>
      </div>
    </>
  );
};

export default Calendar;
