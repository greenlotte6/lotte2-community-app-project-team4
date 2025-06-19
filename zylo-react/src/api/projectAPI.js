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
    const response = await axios.get(`${PROJECT_LIST}`, {
      withCredentials: true,
    });
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
      withCredentials: true,
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
    const response = await axios.get(`${PROJECT_TEAM_LIST}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// 프로젝트 select task
export const getTask = async () => {
  try {
    const response = await axios.get(`${PROJECT_TASK_LIST}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export async function createTask(payload) {
  try {
    const response = await axios.post(`${PROJECT_TASK_LIST}`, payload, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

// 프로젝트 delete task
export const deleteTask = async (taskId) => {
  try {
    const response = await axios.delete(`${PROJECT_TASK_LIST}/${taskId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.error("작업 삭제 실패:", err);
    throw err;
  }
};

// 프로젝트 delete team
export const deleteTeam = async (teamId) => {
  try {
    const response = await axios.delete(`${PROJECT_TEAM_LIST}/${teamId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.error("작업 삭제 실패:", err);
    throw err;
  }
};
