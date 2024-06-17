import { useState, useEffect } from "react";
import { getArticles, getArticleById } from "../Api";
import { useNavigate } from "react-router-dom";

export const Home = ({setArticle}) => {
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);
    
    

    useEffect(() => {
        getArticles().then((articlesArr) => {
          setArticles(articlesArr.slice(0, 10));
        });
    }, []);

    const handleArticleClick = (article_id) => {
        getArticleById(article_id)
            .then((articleFromApi) => {
                setArticle(articleFromApi);
                navigate(`/articles/${articleFromApi.title}`); 
            })
    };

    return (
        <>
            <h2>The Ten Latest News:</h2>
                {articles.map((article) => {
                    return (
                    <div className="article_list" key={article.title} onClick={()=>handleArticleClick(article.article_id)}>
                        <h3>{article.title}</h3>
                        <p>Author: {article.author}</p>
                        <img className="article_image" src={article.article_img_url} alt={article.title} />
                    </div>
                    )
                })}
        </>
    );
}
