import axios from "axios";
import { ARTICLE_LIST, SERVER_HOST } from "./_http";

// 게시글 조회
export const getArticles = async () => {
  try {
    const response = await axios.get(ARTICLE_LIST);
    return response.data;
  } catch (err) {
    console.error("게시글 목록 조회 실패:", err);
  }
};

// 게시글 등록
export const createArticle = async ({ title, subtitle, content, categoryId }) => {
  const articleData = {
    title,
    subtitle,
    content,
    userId: "tempUser",
    categoryId: categoryId ?? 1,
    createdAt: new Date().toISOString().slice(0, 10),
  };

  const response = await axios.post(`${SERVER_HOST}/article`, articleData);
  return response.data;
};

//게시글 삭제
export const deleteArticle= async (id) =>{
  const res= await axios.delete(`${SERVER_HOST}/v1/article/${id}`);
  return res.data;
}
