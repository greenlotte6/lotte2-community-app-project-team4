import { MarkDown } from "../../components/markdown/MarkDown";
import { BasicLayout } from "../../layouts/BasicLayout";
import "../../styles/markdown/markdown.css";

export const MarkDownPage = () => {
  return (
    <BasicLayout>
      <MarkDown />
    </BasicLayout>
  );
};
