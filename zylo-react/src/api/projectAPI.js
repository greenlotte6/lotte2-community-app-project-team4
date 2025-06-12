import axios from "axios";
import { PROJECT_INSERT, PROJECT_LIST } from "./_http";

// 프로젝트 selectAll
export const getName = async () => {
  try {
    const response = await axios.get(`${PROJECT_LIST}`);
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// 프로젝트 insert
export const postCreate = async (payload) => {
  try {
    const response = await axios.post(`${PROJECT_INSERT}`, payload, { headers: { "Content-Type": "application/json" } });
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
