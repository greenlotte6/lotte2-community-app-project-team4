import { MainLayout } from "../../layouts/main/MainLayout";
import "../../styles/main/main.css";
import { Introduction } from "../../components/main/Introduction";
import { About } from "../../components/main/About";
import { Services } from "../../components/main/Services";

export const MainPage = () => {
  return (
    <MainLayout>
      <Introduction />
      <About />
      <Services />
    </MainLayout>
  );
};
