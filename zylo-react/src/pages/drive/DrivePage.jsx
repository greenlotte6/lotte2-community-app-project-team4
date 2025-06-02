import { BasicLayout } from "../../layouts/BasicLayout";
import { SearchBox } from "../../components/drive/SearchBox";
import { FileContainer } from "../../components/drive/FileContainer";

export const DrivePage = () => {
  return (
    <BasicLayout title={"드라이브"}>
      <SearchBox />
      <FileContainer />
    </BasicLayout>
  );
};
