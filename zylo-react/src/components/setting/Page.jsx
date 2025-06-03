import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "../../styles/setting/page.css";
import { useTheme } from "../../contexts/ThemeContext";

const Page = () => {
  const { toggled, toggle } = useTheme();
  return (
    <>
      <div class="content-wrapper">
        <div class="setting-content-title">
          <span>
            <FontAwesomeIcon icon={faFileLines} className="menu-icon" />
          </span>
          페이지 설정
        </div>
        <select
          className={`setting-item setting-item-select ${
            toggled ? "dark" : "light"
          }`}
        >
          <option value="페이지1">페이지1</option>
          <option value="페이지2">페이지2</option>
          <option value="페이지3">페이지3</option>
          <option value="페이지4">페이지4</option>
        </select>
        <div class="setting-item">
          <div class="setting-item-title">접근 권한 관리</div>
          <div class="setting-item-subtitle">
            페이지별 공유/쓰기/편집 권한을 사용자 그룹별로 설정합니다.
          </div>
          <div class="setting-item-control setting-item-check">
            <div class="setting-item-control-info">
              <div class="setting-item-control-title">개발팀</div>
              <div class="setting-item-control-subtitle">12명의 멤버</div>
            </div>
            <label>
              <input type="checkbox" />
              공유
            </label>
            <label>
              <input type="checkbox" />
              쓰기
            </label>
            <label>
              <input type="checkbox" />
              편집
            </label>
          </div>
          <div class="setting-item-control setting-item-check">
            <div class="setting-item-control-info">
              <div class="setting-item-control-title">마케팅팀</div>
              <div class="setting-item-control-subtitle">8명의 멤버</div>
            </div>
            <label>
              <input type="checkbox" />
              공유
            </label>
            <label>
              <input type="checkbox" />
              쓰기
            </label>
            <label>
              <input type="checkbox" />
              편집
            </label>
          </div>
          <div class="setting-item-control setting-item-check">
            <div class="setting-item-control-info">
              <div class="setting-item-control-title">인사팀</div>
              <div class="setting-item-control-subtitle">5명의 멤버</div>
            </div>
            <label>
              <input type="checkbox" />
              공유
            </label>
            <label>
              <input type="checkbox" />
              쓰기
            </label>
            <label>
              <input type="checkbox" />
              편집
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
      </div>
    </>
  );
};

export default Page;
