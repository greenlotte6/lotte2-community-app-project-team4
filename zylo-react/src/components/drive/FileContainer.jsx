import { useState } from "react";
import { SearchBox } from "./SearchBox";
import { FileManager } from "@cubone/react-file-manager";
import "@cubone/react-file-manager/dist/style.css";

export const FileContainer = () => {
  const [files, setFiles] = useState([
    {
      name: "Documents",
      isDirectory: true, // Folder
      path: "/Documents", // Located in Root directory
      updatedAt: "2024-09-09T10:30:00Z", // Last updated time
    },
    {
      name: "Pictures",
      isDirectory: true,
      path: "/Pictures", // Located in Root directory as well
      updatedAt: "2024-09-09T11:00:00Z",
    },
    {
      name: "Pic.png",
      isDirectory: false, // File
      path: "/Pictures/Pic.png", // Located inside the "Pictures" folder
      updatedAt: "2024-09-08T16:45:00Z",
      size: 2048, // File size in bytes (example: 2 KB)
    },
  ]);
  return (
    <div id="drive">
      <SearchBox />
      <FileManager
        files={files}
        height={700}
        fileUploadConfig={{ url: "", method: "POST" }}
        onFileUploaded={() => {
          alert("업로드 완료");
        }}
        enableFilePreview={false}
        onCreateFolder={(name, parentFolder) => {
          alert(`${parentFolder}에 ${name} 폴더를 생성하였습니다.`);
        }}
      />
      {/*
      <div id="grid-container">
        <section id="file-grid">
          <div className="file-container">
            <Link to="" className={toggled ? "file dark" : "file"}></Link>
          </div>
          <div className="file-container">
            <Link to="" className={toggled ? "file dark" : "file"}></Link>
          </div>
          <div className="file-container">
            <Link to="" className={toggled ? "file dark" : "file"}></Link>
          </div>
          <div className="file-container">
            <Link to="" className={toggled ? "file dark" : "file"}></Link>
          </div>
          <div className="file-container">
            <Link to="" className={toggled ? "file dark" : "file"}></Link>
          </div>
          <div className="file-container">
            <Link to="" className={toggled ? "file dark" : "file"}></Link>
          </div>
        </section>
      </div>
      <button id="more" className={toggled ? "dark" : "light"}>
        더보기 <FontAwesomeIcon icon={faPlus} />
      </button>
      <button id="upload-btn" className={toggled ? "dark" : "light"}>
        업로드 <FontAwesomeIcon icon={faUpload} />
      </button>

      */}
    </div>
  );
};
