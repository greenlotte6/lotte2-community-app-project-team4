import React from "react";

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handleClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="pagination">
      <a
        href="#"
        className="prev"
        onClick={(e) => {
          e.preventDefault();
          handleClick(currentPage - 1);
        }}
      >
        «
      </a>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <a
          href="#"
          key={page}
          className={`page ${page === currentPage ? "active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            handleClick(page);
          }}
        >
          {page}
        </a>
      ))}

      <a
        href="#"
        className="next"
        onClick={(e) => {
          e.preventDefault();
          handleClick(currentPage + 1);
        }}
      >
        »
      </a>
    </div>
  );
};
