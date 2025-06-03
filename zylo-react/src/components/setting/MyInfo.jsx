import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "../../styles/setting/myInfo.css";

const MyInfo = () => {
  const { toggled, toggle } = useTheme();

  return (
    <>
      <div className="table-wrapper">
        <div className="setting-content-title">
          <span>
            <FontAwesomeIcon icon={faUser} className="menu-icon" />
          </span>
          내 정보
        </div>
        <form>
          <table
            className={`myinfo-table ${toggled ? "dark" : "light"}`}
            border="1"
          >
            <tbody>
              <tr className={toggled ? "dark" : "light"}>
                <td
                  className={`myinfo-table-label ${toggled ? "dark" : "light"}`}
                >
                  회사명
                </td>
                <td>
                  <input type="text" />
                </td>
              </tr>
              <tr className={toggled ? "dark" : "light"}>
                <td
                  className={`myinfo-table-label ${toggled ? "dark" : "light"}`}
                >
                  비밀번호
                </td>
                <td>
                  <button className={toggled ? "dark" : "light"}>수정</button>
                </td>
              </tr>
              <tr className={toggled ? "dark" : "light"}>
                <td
                  className={`myinfo-table-label ${toggled ? "dark" : "light"}`}
                >
                  부서
                </td>
                <td>
                  <input type="text" />
                </td>
              </tr>
              <tr className={toggled ? "dark" : "light"}>
                <td
                  className={`myinfo-table-label ${toggled ? "dark" : "light"}`}
                >
                  직위
                </td>
                <td>
                  <input type="text" />
                </td>
              </tr>
              <tr className={toggled ? "dark" : "light"}>
                <td
                  className={`myinfo-table-label ${toggled ? "dark" : "light"}`}
                >
                  email
                </td>
                <td>
                  <input type="text" />
                </td>
              </tr>
              <tr className={toggled ? "dark" : "light"}>
                <td
                  className={`myinfo-table-label ${toggled ? "dark" : "light"}`}
                >
                  전화번호
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

export default MyInfo;
