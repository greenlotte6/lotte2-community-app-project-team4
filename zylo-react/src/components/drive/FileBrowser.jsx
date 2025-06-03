import { Tree } from "react-arborist";
import { useTheme } from "../../contexts/ThemeContext";

export const FileBrowser = () => {
  const { toggled } = useTheme();
  const fileTree = [
    {
      id: "src",
      name: "src",
      children: [
        { id: "app", name: "App.jsx", isLeaf: true },
        {
          id: "components",
          name: "components",
          children: [
            { id: "header", name: "Header.jsx", isLeaf: true },
            { id: "footer", name: "Footer.jsx", isLeaf: true },
          ],
        },
      ],
    },
    {
      id: "public",
      name: "public",
      children: [{ id: "index", name: "index.html", isLeaf: true }],
    },
  ];

  return (
    <>
      <div id="file-browser" className={toggled ? "dark" : ""}>
        <Tree
          initialData={fileTree}
          openByDefault={false}
          width={300}
          height={500}
        >
          {({ node, style }) => (
            <div
              className={`tree-node ${node.isLeaf ? "leaf" : "folder"} ${
                node.isOpen ? "open" : "closed"
              }`}
              style={{
                ...style,
                paddingLeft: node.level * 20,
                cursor: node.isLeaf ? "default" : "pointer",
                width: 280,
              }}
              onClick={() => {
                if (!node.isLeaf) {
                  node.toggle(); // ⬅️ 여기서 열고 닫기
                }
              }}
            >
              {node.isLeaf ? "📄" : node.isOpen ? "📂" : "📁"} {node.data.name}
            </div>
          )}
        </Tree>
      </div>
    </>
  );
};
