const isLocal =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

export const SERVER_HOST = isLocal
  ? "http://localhost:8081"
  : "https://api.greenlotteon.com";

// project
export const PROJECT_LIST = `${SERVER_HOST}/project`;
export const PROJECT_INSERT = `${SERVER_HOST}/project`;
export const PROJECT_TEAM_LIST = `${SERVER_HOST}/project/team`;
export const PROJECT_TASK_LIST = `${SERVER_HOST}/project/task`;

// article
export const ARTICLE_LIST = `${SERVER_HOST}/article`;
