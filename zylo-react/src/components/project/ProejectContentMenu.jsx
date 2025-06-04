import React from "react";
import "../../styles/project/contentMenu.css";

const ProejectContentMenu = () => {
  return (
    <>
      <div class="tabs">
        <div class="tab-buttons">
          <input type="radio" name="tab" id="tab1" checked />
          <label for="tab1">개요</label>

          <input type="radio" name="tab" id="tab2" />
          <label for="tab2">팀원</label>

          <input type="radio" name="tab" id="tab3" />
          <label for="tab3">업무</label>

          <input type="radio" name="tab" id="tab5" />
          <label for="tab5">파일</label>

          <input type="radio" name="tab" id="tab6" />
          <label for="tab6">일정</label>

          <input type="radio" name="tab" id="tab7" />
          <label for="tab7">통계</label>
        </div>
      </div>
    </>
  );
};

export default ProejectContentMenu;
