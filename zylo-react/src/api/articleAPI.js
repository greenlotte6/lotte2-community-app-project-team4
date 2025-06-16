import axios from "axios";
import { ARTICLE_LIST } from "./_http";

//게시글 조회
export const getArticles = async () =>{
    try{
        const response = await axios.get(`${ARTICLE_LIST}`);
        console.log(response);
        return response.data;

    } catch(err){
        console.error("게시글 목록 조회 실패:",err);
    }
};