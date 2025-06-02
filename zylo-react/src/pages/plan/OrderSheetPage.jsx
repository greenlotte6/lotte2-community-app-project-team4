import { BasicLayout } from "../../layouts/BasicLayout";
import { OrderSheet } from "../../components/plan/OrderSheet";
import "../../styles/plan/orderSheet.css";

export const OrderSheetPage = () => {
  return (
    <BasicLayout>
      <OrderSheet />
    </BasicLayout>
  );
};
