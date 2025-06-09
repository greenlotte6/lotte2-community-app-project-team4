import { BasicLayout } from "../../layouts/BasicLayout";
import { FileContainer } from "../../components/drive/FileContainer";
import { FileBrowser } from "../../components/drive/FileBrowser";
import "../../styles/drive/drive.css";

export const DrivePage = () => {
  return (
    <BasicLayout title={"드라이브"}>
      <FileContainer />
    </BasicLayout>
  );
};
