import axios from "axios";

const ncApi = axios.create({
    baseURL: "https://winnie-be-nc-news.onrender.com/api",
});

export const getArticles = () => {
    return ncApi.get('/articles').then((response) => {
        return response.data.articles;
    })
    .catch((error) => {
        throw error; 
    });
} 

export const getArticleById = (article_id) => {
    return ncApi
        .get(`/articles/${article_id}`)
        .then((response) => {
            return response.data.article;
        })
        .catch((error) => {
            throw error; 
        });
};

export const getCommentById = (article_id) => {
    return ncApi
        .get(`/articles/${article_id}/comments`)
        .then((response) => {
            return response.data.comment;
        })
        .catch((error) => {
            throw error; 
        });
};