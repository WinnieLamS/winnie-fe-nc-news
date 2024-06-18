import { useState, useEffect } from "react";
import { getArticles, getArticleById } from "../Api";
import { useNavigate } from "react-router-dom";
import  loadingPink  from "../images/loadingPink.gif";

export const Home = ({setArticle}) => {
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    

    useEffect(() => {
        setIsLoading(true)
        getArticles().then((articlesArr) => {
          setArticles(articlesArr.slice(0, 10));
          setIsLoading(false)
        });
    }, []);

    const handleArticleClick = (article_id) => {
        setIsLoading(true)
        getArticleById(article_id)
            .then((articleFromApi) => {
                setArticle(articleFromApi);
                navigate(`/articles/${articleFromApi.title}`); 
                setIsLoading(false)

            })
    };

    return isLoading?(
        <div className="loading-container">
            <h2>Loading......</h2>
            <img src={loadingPink} alt="Loading..." />
        </div>
    ):(
        <div>
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
        </div>
    );
}
