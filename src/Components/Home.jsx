import { useState, useEffect } from "react";
import { getArticles } from "../Api";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        getArticles().then((articlesArr) => {
          setArticles(articlesArr.slice(0, 5));
        });
    }, []);

    return (
        <>
            <h2>The 5 Latest News:</h2>
            <ul>
                {articles.map((article) => (
                    <li key={article.title} onClick={() => navigate(`/articles/${article.title}`)}>
                        {article.title}
                    </li>
                ))}
            </ul>
        </>
    );
}
