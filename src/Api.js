import axios from "axios";

const ncApi = axios.create({
    baseURL: "https://winnie-be-nc-news.onrender.com/api",
});

export const getArticles = () => {
    return ncApi.get('/articles').then((response) => {
        return response.data.articles;
    })
} 

export const getArticleById = (article_id) => {
    return ncApi
        .get(`/articles/${article_id}`)
        .then((response) => {
            return response.data.article;
        })
};