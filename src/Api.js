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

export const patchVote = (article_id, voteChange) => {
const patchBody = { inc_votes: voteChange};

    return ncApi
        .patch(`/articles/${article_id}`, patchBody)
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

export const postComment = (article_id, username, body) => {
    const postBody = { 
        username: username,
        body: body
    };
    
        return ncApi
            .post(`/articles/${article_id}/comments`, postBody)
            .then((response) => {
                return response.data.comment;
            })
            .catch((error) => {
                throw error; 
            });
    };

export const deleteComment = (comment_id) => {
    console.log(comment_id);
        return ncApi
            .delete(`/comments/${comment_id}`)
            .then(() => {
              
            })
            .catch((error) => {
                throw error; 
            });
    };

export const getTopics = () => {
    return ncApi.get(`/topics`).then((response) => {
        return response.data.topics;
    })
    .catch((error) => {
        throw error; 
    });
} 

export const getUser = (username) => {
    return ncApi.get(`/users/${username}`).then((response) => {
        return response.data.userArr[0];
    })
    .catch((error) => {
        throw error; 
    });
} 

export const postUser = (postObj) => {
    return ncApi.post('/users', postObj).then((response)=>{
        console.log(response.data, "<<<after post");
        return response.data.user;
    }).catch((err)=>{
        console.log(err);      
    })
}