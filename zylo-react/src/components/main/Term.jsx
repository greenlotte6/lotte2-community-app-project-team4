import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const Term = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const termId = params.get("id");
  console.log(location, params, termId);
  useEffect(() => {
    alert(`Axios를 이용해 id=${termId}인 term 데이터 가져오기`);
  }, []);

  return (
    <div className="term-container">
      <h3>이용약관</h3>
      <textarea
        readOnly
        value="
      제 1 장 총칙 제 1 조 (목적) 본 약관은 (주)제이피 이노베이션(이하 “회사”라
      합니다)이 운영하는 웹사이트 ‘어반런드렛’ (www.urbanlaunderette.com) (이하
      “웹사이트”라 합니다)에서 제공하는 온라인 서비스(이하 “서비스”라 한다)를
      이용함에 있어 사이버몰과 이용자의 권리, 의무 및 책임사항을 규정함을
      목적으로 합니다.
    "
        rows={5}
        cols={40}
      ></textarea>
    </div>
  );
};
