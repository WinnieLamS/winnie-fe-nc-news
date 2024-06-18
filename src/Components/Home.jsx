import { useState, useEffect } from "react";
import { getArticles, getArticleById } from "../Api";
import { useNavigate } from "react-router-dom";
import { Loading } from "./LowerComponenets/Loading";
import { Error } from "./LowerComponenets/Error";

export const Home = ({setArticle, isLoading, setIsLoading}) => {
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]); 
    const [error, setError] = useState(null);  
    

    useEffect(() => {
        setIsLoading(true)
        getArticles()
        .then((articlesArrFromApi) => {
          setArticles(articlesArrFromApi.slice(0, 10));
          setIsLoading(false)
        })
        .catch((error) => {
            setError(error);
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
            .catch((error) => {
                console.log(error);
                setError(error);
              })
    };

    if (isLoading) {
        return <Loading />; 
    }

    if (error) {
        return <Error error={error} />;
      }

    return (
        <div>
            <h2>The Ten Latest News:</h2>
                {articles.map((article) => {
                    return (
                    <div className="article_list" 
                         key={article.article_id} 
                         onClick={()=>handleArticleClick(article.article_id)}>
                        <h3>{article.title}</h3>
                        <p>Author: {article.author}</p>
                        <img className="article_image" src={article.article_img_url} alt={article.title} />
                    </div>
                    )
                })}
        </div>
    );
}
