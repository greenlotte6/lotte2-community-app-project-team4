import PostList from "../../components/article/PostList";
import { BasicLayout } from "../../layouts/BasicLayout";
import { Pagination }from "../../components/article/Pagination";
import "../../styles/article/postList.css";
import { Link } from "react-router-dom";
import { SideMenu } from "../../components/article/SideMenu";

import { Post } from "../../components/article/Post";
import { Modal } from "../../components/article/Modal";
import { CommentList } from "../../components/article/CommentList";
import { CommentItem } from "../../components/article/CommentItem";
import { CommentForm } from "../../components/article/CommentForm";


export const ListPage = () => {
  return (
    <BasicLayout title={"게시판"}>
      <SideMenu />
        <PostList />
    </BasicLayout>
  );
};
