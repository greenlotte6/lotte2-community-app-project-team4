import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";

export const OrderSheet = () => {
  const { toggled } = useTheme();
  return (
    <div id="order-sheet">
      <div className={toggled ? "success-icon-area dark" : "success-icon-area"}>
        <FontAwesomeIcon icon={faCheck} />
      </div>
      <h3>감사합니다!</h3>
      <span>결제가 성공적으로 완료되었습니다.</span>
      <table className="payment-review">
        <tr>
          <th>결제금액</th>
          <td>99,000원</td>
        </tr>
        <tr>
          <th>다음 결제 예정일</th>
          <td>2025.06.30</td>
        </tr>
      </table>
      <Link to="/dashboard" className={toggled ? "home-btn dark" : "home-btn"}>
        돌아가기
      </Link>
    </div>
  );
};
