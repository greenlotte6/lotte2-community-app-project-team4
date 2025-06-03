import MarkDownEditor from "../../components/markdown/MarkDownEditor";
import { BasicLayout } from "../../layouts/BasicLayout";
import "../../styles/reset.css";
import "@mdxeditor/editor/style.css";
import "../../styles/markdown/markdown.css";
import { FileBrowser } from "../../components/drive/FileBrowser";

export const MarkDownPage = () => {
  return (
    <BasicLayout title={"문서 작성"}>
      <FileBrowser />
      <MarkDownEditor />
    </BasicLayout>
  );
};
