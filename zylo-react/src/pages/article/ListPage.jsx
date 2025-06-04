import { useState } from "react";
import PostList from "../../components/article/PostList";
import { BasicLayout } from "../../layouts/BasicLayout";
import Pagination from "../../components/article/Pagination";
import WriteModal from "../../components/article/WriteModal";
import "../../styles/article/post.css";

export const ListPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "4조 프로젝트 진행 상황",
      author: "zyla",
      group: "4조",
      date: "2024-12-15",
      content: "진행중",
      comments: [
        {
          id: 1,
          author: "김철수",
          date: "2025-06-02 14:30",
          content: "프로젝트 진행 상황이 궁금하네요!",
        },
      ],
      views: 24,
    },
    // ...기타 포스트 데이터
  ]);

  const handleAddPost = (newPost) => {
    setPosts([...posts, newPost]);
    setShowModal(false);
  };

  return (
    <BasicLayout title={"게시판"}>
      <div className="main-container">
        <div className="main-header">
          <h1 className="list-title">목록</h1>
        </div>
        <PostList posts={posts} />
        <Pagination />
        <button className="write-btn" onClick={() => setShowModal(true)}>
          글쓰기 +
        </button>
        {showModal && (
          <WriteModal
            onAddPost={handleAddPost}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </BasicLayout>
  );
};
