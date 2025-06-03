import { faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

export const RecentArticles = () => {
  const displayRef = useRef(null);
  const [hidden, setHidden] = useState(true);
  const [article, setArticle] = useState({
    id: 0,
    title: "",
    content: "",
    author: "",
    created_date: "",
  });

  const handleClick = (e) => {
    e.preventDefault();

    const href = e.currentTarget.getAttribute("href");
    alert(`[TODO] Axios를 이용해 '${href}'로 요청 보내기`);
    setArticle({
      id: 1,
      title: "게시물 테스트",
      content: "테스트 게시물 내용 입니다.",
      author: "Alice Bob",
      created_date: "2025-01-10",
    });
    setHidden(false);
  };

  return (
    <section className="dashboard">
      <div className="dashboard-title">
        <FontAwesomeIcon icon={faNewspaper} />
        <span>최근 게시물</span>
      </div>
      <div id="articles">
        <Link
          to="/article/view?id=1"
          className={"card article"}
          onClick={handleClick}
        >
          1
        </Link>
        <Link
          to="/article/view?id=2"
          className={"card article"}
          onClick={handleClick}
        >
          2
        </Link>
        <Link
          to="/article/view?id=3"
          className={"card article"}
          onClick={handleClick}
        >
          3
        </Link>
        <Link
          to="/article/view?id=4"
          className={"card article"}
          onClick={handleClick}
        >
          4
        </Link>
      </div>
      <div
        id="display"
        className={hidden ? "article-display hidden" : "article-display"}
      >
        <h3 className="article-title">{article.title}</h3>
        <span className="article-author">{article.author}</span>
        <span className="created-date">{article.created_date}</span>
        <textarea
          ref={displayRef}
          name="content"
          id="article-content"
          value={article.content}
          readOnly
        ></textarea>
      </div>
    </section>
  );
};
