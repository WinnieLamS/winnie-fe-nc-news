import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loading } from "./Loading";
import { getArticles } from "../../Api";
import { Error } from "./Error";

export const ArticleList = () => {
    const navigate = useNavigate();
    const { topic } = useParams();
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null); 
    
    
    useEffect(() => {
        setIsLoading(true);
        getArticles()
        .then((articlesArrFromApi) => {
            let filteredArticles = articlesArrFromApi;
            if (topic) {
                filteredArticles = articlesArrFromApi.filter((article) => article.topic === topic);
            }
            setArticles(filteredArticles);
            setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });
    }, [topic]);


    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <Error error={error} />;
    }

    const handleArticleClick = (article_id) => {
        navigate(`/article/${article_id}`);
    };
 

    return (
        <>
        {topic? (<h3>{topic}</h3>):(<h3>The Latest News:</h3>)}
                {articles.map((article) => (
                    <div
                        className="article_list"
                        key={article.article_id}
                        onClick={() => handleArticleClick(article.article_id)}
                    >
                        <h4>{article.title}</h4>
                        <p>Topic: {article.topic}</p>
                        <img
                            className="article_image"
                            src={article.article_img_url}
                            alt={article.title}
                        />
                    </div>
                ))}
        </>
    );
};
