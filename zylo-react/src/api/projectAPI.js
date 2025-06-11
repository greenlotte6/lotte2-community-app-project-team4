import axios from "axios";
import { PROJECT_LIST } from "./_http";

export const getName = async () => {
  try {
    const response = await axios.get(`${PROJECT_LIST}`);
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
