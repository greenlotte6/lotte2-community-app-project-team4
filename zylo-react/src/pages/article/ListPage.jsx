import PostList from "../../components/article/PostList";
import { BasicLayout } from "../../layouts/BasicLayout";
import { Pagination }from "../../components/article/Pagination";
import "../../styles/article/PostList.css";
import { Link } from "react-router-dom";
import { SideMenu } from "../../components/article/SideMenu";



export const ListPage = () => {
  return (
    <BasicLayout title={"게시판"}>
      <SideMenu />
        <PostList />
    </BasicLayout>
    
  );
};
