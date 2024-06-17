import axios from "axios";

const ncApi = axios.create({
    baseURL: "https://winnie-be-nc-news.onrender.com/api",
});

export const getArticles = () => {
    return ncApi.get(`/articles`).then((response) => {
        return response.data.articles;
    })
} 