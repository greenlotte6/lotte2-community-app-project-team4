import { MainLayout } from "../../layouts/main/MainLayout";
import "../../styles/main/main.css";
import "../../styles/main/footer.css";
import { Introduction } from "../../components/main/Introduction";
import { About } from "../../components/main/About";
import { Services } from "../../components/main/Services";
import { Footer } from "../../components/main/Footer";

export const MainPage = () => {
  return (
    <>
      <MainLayout>
        <Introduction />
        <About />
        <Services />
      </MainLayout>
    </>
  );
};
