import axios from "axios";
import {
  PROJECT_INSERT,
  PROJECT_LIST,
  PROJECT_TASK_LIST,
  PROJECT_TEAM_LIST,
} from "./_http";

// 프로젝트 selectAll
export const getName = async () => {
  try {
    const response = await axios.get(`${PROJECT_LIST}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// 프로젝트 insert
export const postCreate = async (payload) => {
  try {
    const response = await axios.post(`${PROJECT_INSERT}`, payload, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// 프로젝트 select team
export const getTeam = async () => {
  try {
    const response = await axios.get(`${PROJECT_TEAM_LIST}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// 프로젝트 select task
export const getTask = async () => {
  try {
    const response = await axios.get(`${PROJECT_TASK_LIST}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// 프로젝트 insert task
export async function createTask(projectId, columnId, title, description) {
  const response = await fetch("http://localhost:8081/project/task", {
    method: "",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      projectId,
      columnId,
      title,
      description,
    }),
  });

  if (!response.ok) throw new Error("작업 생성 실패");

  return await response.json();
}
