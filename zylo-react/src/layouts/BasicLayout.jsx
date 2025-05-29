import { SideBar } from "../components/common/SideBar";
import { Content } from "../components/common/Content";

export const BasicLayout = ({ title, children }) => {
  return (
    <>
      <div id="container">
        <SideBar />
        <Content title={title} content={children}></Content>
      </div>
    </>
  );
};
