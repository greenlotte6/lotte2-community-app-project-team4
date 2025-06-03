import React from "react";
import "../../styles/setting/project.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../contexts/ThemeContext";

const Project = () => {
  const { toggled, toggle } = useTheme();
  return (
    <>
      <form className="content-wrapper">
        <div class="setting-content-title">
          <span>
            <FontAwesomeIcon icon={faPenToSquare} className="menu-icon" />
          </span>
          프로젝트 설정
        </div>
        <select
          className={`setting-item setting-item-select ${
            toggled ? "dark" : "light"
          }`}
        >
          <option value="프로젝트1">프로젝트1</option>
          <option value="프로젝트2">프로젝트2</option>
          <option value="프로젝트3">프로젝트3</option>
          <option value="프로젝트4">프로젝트4</option>
        </select>
        <div class="setting-item">
          <div class="setting-item-title">기본 설정</div>
          <div class="setting-item-subtitle">
            프로젝트의 기본 정보를 설정합니다.
          </div>
          <div class="setting-item-control">
            <div class="setting-item-control-row">
              <div class="setting-item-control-group">
                <div class="setting-item-control-title">프로젝트 이름</div>
                <input type="text" />
              </div>
              <div class="setting-item-control-group">
                <div class="setting-item-control-title">프로젝트 URL</div>
                <input type="text" />
              </div>
            </div>
            <div class="setting-item-control-group">
              <div class="setting-item-control-title">프로젝트 설명</div>
              <textarea></textarea>
            </div>
          </div>
        </div>
        <div class="setting-item">
          <div class="setting-item-header">
            <div>
              <div class="setting-item-title">프로젝트 멤버</div>
              <div class="setting-item-subtitle">
                프로젝트 참여하는 멤버를 관리합니다.
              </div>
            </div>
            <button>
              <span>
                <FontAwesomeIcon icon={faUserPlus} />
              </span>
              &nbsp;&nbsp;멤버 추가
            </button>
          </div>
          <div class="setting-item-content">
            <div class="member-row">
              <img src="" alt="" />
              <div class="member-info">
                <div class="member-name">홍길동</div>
                <div class="member-email">abc@naver.com</div>
              </div>
              <select>
                <option value="">편집 가능</option>
                <option value="">보기만 가능</option>
              </select>
            </div>
            <div class="member-row">
              <img src="" alt="" />
              <div class="member-info">
                <div class="member-name">홍길동</div>
                <div class="member-email">abc@naver.com</div>
              </div>
              <select name="" id="">
                <option value="">편집 가능</option>
                <option value="">보기만 가능</option>
              </select>
            </div>
            <div class="member-row">
              <img src="" alt="" />
              <div class="member-info">
                <div class="member-name">홍길동</div>
                <div class="member-email">abc@naver.com</div>
              </div>
              <select name="" id="">
                <option value="">편집 가능</option>
                <option value="">보기만 가능</option>
              </select>
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
      </form>
    </>
  );
};

export default Project;
