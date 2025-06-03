import React from "react";
import "../../styles/setting/drive.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHardDrive } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../contexts/ThemeContext";

const Drive = () => {
  const { toggled, toggle } = useTheme();
  return (
    <>
      <form className="content-wrapper">
        <div class="setting-content-title">
          <span>
            <FontAwesomeIcon icon={faHardDrive} className="menu-icon" />
          </span>
          드라이브 설정
        </div>
        <select
          className={`setting-item setting-item-select ${
            toggled ? "dark" : "light"
          }`}
        >
          <option value="드라이브1">드라이브1</option>
          <option value="드라이브2">드라이브2</option>
          <option value="드라이브3">드라이브3</option>
          <option value="드라이브4">드라이브4</option>
        </select>
        <div className="setting-item">
          <div className="setting-item-title">저장용량</div>
          <div className="setting-item-subtitle">
            현재 사용중인 저장 공간을 확인합니다.
          </div>
          <div className="volume">
            <div>
              <span>3.25GB</span> / 5GB 사용 중
            </div>
            <div className="storage-label">65% 사용 중</div>
          </div>
          <div className="storage-graph">
            <div className="storage-bar">
              <div className="storage-used" style={{ width: "65%" }}></div>
            </div>
          </div>
          <div className="type">
            <div>문서</div>
            <div>이미지</div>
          </div>
        </div>
        <div className="setting-item">
          <div className="setting-item-title">드라이브 기본 설정</div>
          <div className="setting-item-subtitle">
            파일 관리 및 공유에 대한 기본 설정을 구성합니다.
          </div>
          <div className="setting-item-control setting-item-check">
            <div className="setting-item-control-info">
              <div className="setting-item-control-title">
                파일 미리보기 활성화
              </div>
              <div className="setting-item-control-subtitle">
                이미지, 문서 등 미리보기를 표시합니다.
              </div>
            </div>
            <input type="checkbox" className="setting-item-control-checkbox" />
          </div>
          <div className="setting-item-control setting-item-check">
            <div className="setting-item-control-info">
              <div className="setting-item-control-title">휴지통 보관</div>
              <div className="setting-item-control-subtitle">
                삭제된 파일을 30일간 보관합니다.
              </div>
            </div>
            <input type="checkbox" className="setting-item-control-checkbox" />
          </div>
          <div className="setting-item-control setting-item-check">
            <div className="setting-item-control-info">
              <div className="setting-item-control-title">
                외부 링크 공유 허용
              </div>
              <div className="setting-item-control-subtitle">
                프로젝트 외부 사용자와 파일을 공유할 수 있습니다.
              </div>
            </div>
            <input type="checkbox" className="setting-item-control-checkbox" />
          </div>
        </div>
        <div className="setting-item">
          <div className="setting-item-title">빠른 작업</div>
          <div className="setting-item-subtitle">
            드라이브 관리를 위한 빠른 작업들 입니다.
          </div>
          <div className="expedite">
            <button>전체 백업</button>
            <button>휴지통 비우기</button>
            <button>중복 파일 제거</button>
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

export default Drive;
