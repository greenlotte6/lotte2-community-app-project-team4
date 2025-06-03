import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useTheme } from "../../contexts/ThemeContext";

const Article = () => {
  const { toggled, toggle } = useTheme();
  return (
    <>
      <form class="content-wrapper message-setting">
        <div class="setting-content-title">
          <span>
            <FontAwesomeIcon icon={faClipboard} className="menu-icon" />
          </span>
          게시판 설정
        </div>
        <select
          className={`setting-item setting-item-select ${
            toggled ? "dark" : "light"
          }`}
        >
          <option value="게시판1">게시판1</option>
          <option value="게시판2">게시판2</option>
          <option value="게시판3">게시판3</option>
          <option value="게시판4">게시판4</option>
        </select>
        <div class="setting-item">
          <div class="setting-item-title">기본 설정</div>
          <div class="setting-item-subtitle">
            게시판의 기본 정보를 설정합니다.
          </div>
          <div class="setting-item-control">
            <div class="setting-item-control-row">
              <div class="setting-item-control-group">
                <div class="setting-item-control-title">게시판 이름</div>
                <input type="text" />
              </div>
              <div class="setting-item-control-group">
                <div class="setting-item-control-title">게시판 URL</div>
                <input type="text" />
              </div>
            </div>
            <div class="setting-item-control-group">
              <div class="setting-item-control-title">게시판 설명</div>
              <textarea></textarea>
            </div>
          </div>
        </div>
        <div class="setting-item">
          <div class="setting-item-title">접근권한</div>
          <div class="setting-item-subtitle">
            게시판의 쓰기, 댓글 권한을 설정합니다.
          </div>
          <div class="setting-item-control">
            <div class="setting-item-control-title">읽기권한</div>
            <label>
              <input
                type="radio"
                class="setting-item-radio"
                name="read-access"
              />
              전체 공개
            </label>
            <label>
              <input
                type="radio"
                class="setting-item-radio"
                name="read-access"
              />
              회원만
            </label>
          </div>
          <div class="setting-item-control">
            <div class="setting-item-control-title">쓰기권한</div>
            <label>
              <input
                type="radio"
                class="setting-item-radio"
                name="read-access"
              />
              전체 공개
            </label>
            <label>
              <input
                type="radio"
                class="setting-item-radio"
                name="read-access"
              />
              회원만
            </label>
          </div>
        </div>
        <div class="setting-item">
          <div class="setting-item-title">기능 설정</div>
          <div class="setting-item-subtitle">
            게시판에서 사용할 기능들을 설정합니다.
          </div>
          <div class="setting-item-control setting-item-check">
            <div class="setting-item-control-info">
              <div class="setting-item-control-title">추천/비추천</div>
              <div class="setting-item-control-subtitle">
                게시물에 추천/비추천 활성화합니다.
              </div>
            </div>
            <input type="checkbox" class="setting-item-control-checkbox" />
          </div>
          <div class="setting-item-control setting-item-check">
            <div class="setting-item-control-info">
              <div class="setting-item-control-title">첨부파일 허용</div>
              <div class="setting-item-control-subtitle">
                최대 10MB까지 파일 첨부를 허용합니다.
              </div>
            </div>
            <input type="checkbox" class="setting-item-control-checkbox" />
          </div>
          <div class="setting-item-control setting-item-check">
            <div class="setting-item-control-info">
              <div class="setting-item-control-title">비밀글 허용</div>
              <div class="setting-item-control-subtitle">
                작성자만 볼 수 있는 비밀글 작성을 허용합니다
              </div>
            </div>
            <input type="checkbox" class="setting-item-control-checkbox" />
          </div>
          <div class="setting-item-control setting-item-check">
            <div class="setting-item-control-info">
              <div class="setting-item-control-title">신고 기능 비활성화</div>
              <div class="setting-item-control-subtitle">
                게시물 신고 기능을 비활성화합니다
              </div>
            </div>
            <input type="checkbox" class="setting-item-control-checkbox" />
          </div>
        </div>
        <div class="setting-item">
          <div class="setting-item-title">레이아웃</div>
          <div class="setting-item-subtitle">
            게시판의 표시형식과 정렬방식을 설정합니다.
          </div>
          <div class="setting-item-control">
            <div class="setting-item-control-title">쓰기권한</div>
            <label>
              <input
                type="radio"
                class="setting-item-radio"
                name="read-access"
              />
              리스트
            </label>
            <label>
              <input
                type="radio"
                class="setting-item-radio"
                name="read-access"
              />
              카드
            </label>
            <label>
              <input
                type="radio"
                class="setting-item-radio"
                name="read-access"
              />
              갤러리
            </label>
          </div>
          <div class="setting-item-control">
            <div class="setting-item-control-title">정렬</div>
            <label>
              <input
                type="radio"
                class="setting-item-radio"
                name="read-access"
              />
              최신순
            </label>
            <label>
              <input
                type="radio"
                class="setting-item-radio"
                name="read-access"
              />
              추천순
            </label>
          </div>
          <div class="setting-item-control">
            <div class="setting-item-control-title">페이지당 게시물 수</div>
            <select>
              <option value="">20개</option>
            </select>
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

export default Article;
