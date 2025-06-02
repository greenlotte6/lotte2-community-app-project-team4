import React from "react";
import { BasicLayout } from "../../layouts/BasicLayout";
import SettingSideBar from "../../components/common/setting/SettingSideBar.jsx";

const MyInfoPage = () => {
  return (
    <BasicLayout title={"설정"}>
      <SettingSideBar></SettingSideBar>
    </BasicLayout>
  );
};

export default MyInfoPage;
