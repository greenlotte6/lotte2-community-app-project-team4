import { MainHeader } from "../../components/main/MainHeader";

export const MainLayout = ({ children }) => {
  return (
    <>
      <div id="main-container">
        <MainHeader />
        <article id="main-content">{children}</article>
      </div>
    </>
  );
};
