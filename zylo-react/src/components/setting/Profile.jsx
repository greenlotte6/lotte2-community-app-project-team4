import { faPortrait } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import "../../styles/setting/profile.css";

const Profile = () => {
  const { toggled, toggle } = useTheme();

  return (
    <>
      <div className="content-wrapper">
        <form>
          <div className="setting-content-title">
            <span>
              <FontAwesomeIcon icon={faPortrait} className="menu-icon" />
            </span>
            프로필 수정
          </div>
          <div className="setting-content-subtitle">
            대표 프로필과 이름을 수정 하실 수 있습니다.
          </div>
          <table
            className={`myinfo-table ${toggled ? "dark" : "light"}`}
            border="1"
          >
            <tbody>
              <tr className={toggled ? "dark" : "light"}>
                <td
                  className={`myinfo-table-label ${toggled ? "dark" : "light"}`}
                >
                  프로필사진
                </td>
                <td>
                  <div class="profile-photo-wrapper">
                    <img
                      src=""
                      alt=""
                      className={`profile-photo ${toggled ? "dark" : "light"}`}
                    />
                  </div>
                  <br />
                  <button
                    className={`profile-button ${toggled ? "dark" : "light"}`}
                  >
                    사진변경
                  </button>
                  <button
                    className={`profile-button ${toggled ? "dark" : "light"}`}
                  >
                    삭제
                  </button>
                </td>
              </tr>
              <tr className={toggled ? "dark" : "light"}>
                <td
                  className={`myinfo-table-label ${toggled ? "dark" : "light"}`}
                >
                  이름
                </td>
                <td>
                  <input type="text" />
                </td>
              </tr>
            </tbody>
          </table>
          <input
            type="submit"
            className={`myinfo-table-submit ${toggled ? "dark" : "light"}`}
            value="저장"
          ></input>
        </form>
      </div>
    </>
  );
};

export default Profile;
