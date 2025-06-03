import { DashBoard } from "../../components/dashboard/DashBoard";
import { BasicLayout } from "../../layouts/BasicLayout";

export const DashboardPage = () => {
  return (
    <BasicLayout title={"대시보드"}>
      <DashBoard />
    </BasicLayout>
  );
};
