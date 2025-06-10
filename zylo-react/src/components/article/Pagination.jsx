import React from "react";
import "../../styles/article/Pagination.css"; // 스타일 따로 관리하면 좋음

export const Pagination = () => {
  return (
    <div className="pagination">
      

      {[1, 2, 3].map((page) => (
        <button
          key={page}
          className={`page ${page === 1 ? "active" : ""}`} // 1페이지만 활성화 예시
        >
          {page}
        </button>
      ))}

      
    </div>
  );
};
