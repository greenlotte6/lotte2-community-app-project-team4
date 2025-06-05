import PostList from "../../components/article/PostList";
import { BasicLayout } from "../../layouts/BasicLayout";
import Pagination from "../../components/article/Pagination";
import "../../styles/article/post.css";
import { Link } from "react-router-dom";
import { SideMenu } from "../../components/article/SideMenu";

export const ListPage = () => {
  return (
    <BasicLayout title={"게시판"}>
      <SideMenu />
      <section id="post-list-container">
        <h1 className="list-title">공지사항</h1>
        <PostList />
        <Link className="write-btn">글쓰기 +</Link>
      </section>
    </BasicLayout>
  );
};
