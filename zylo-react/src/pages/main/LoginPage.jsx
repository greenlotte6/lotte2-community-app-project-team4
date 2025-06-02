import { MainLayout } from "../../layouts/main/MainLayout";
import { Login } from "../../components/main/Login";
import "../../styles/main/signup.css";
import "../../styles/main/login.css";

export const LoginPage = () => {
  return (
    <MainLayout>
      <Login />
    </MainLayout>
  );
};
