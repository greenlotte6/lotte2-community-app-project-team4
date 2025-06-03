import "@mdxeditor/editor/style.css";
import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  markdownShortcutPlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  ListsToggle,
  BlockTypeSelect,
  CreateLink,
  InsertTable,
  InsertThematicBreak,
  linkPlugin,
  tablePlugin,
} from "@mdxeditor/editor";

export default function MarkDownEditor() {
  return (
    <div className="markdown">
      <MDXEditor
        markdown={`# 제목 1`}
        plugins={[
          headingsPlugin(),
          listsPlugin(), // 순서/비순서 목록
          quotePlugin(),
          tablePlugin(),
          markdownShortcutPlugin(), // 마크다운 단축키 지원
          thematicBreakPlugin(),
          linkPlugin(), // 링크 인식
          toolbarPlugin({
            toolbarContents: () => (
              <>
                <UndoRedo />
                <BoldItalicUnderlineToggles />
                <BlockTypeSelect />
                <ListsToggle />
                <CreateLink /> {/* 링크 삽입 버튼 */}
                <InsertTable />
                <InsertThematicBreak />
              </>
            ),
          }),
        ]}
      />
    </div>
  );
}
