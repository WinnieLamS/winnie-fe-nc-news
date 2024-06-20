import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loading } from "./Loading";
import { getArticles } from "../../Api";
import { Error } from "./Error";
import { NavigateBar } from "./NavigateBar";
import { UserContext } from "../../contexts/UserContext";

export const ArticleList = () => {
    const navigate = useNavigate();
    const { topic } = useParams();
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null); 
    const [options, setOptions] = useState({
        sort_by: "created_at",
        order: "desc"
    });
    const [formInputs, setFormInputs] = useState({
        sort_by: "created_at",
        order: "desc"
    });
    
    const fetchArticles = () => {
        setIsLoading(true);
        getArticles(options)
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
    };

    useEffect(() => {
        fetchArticles();
    }, [topic, options]);
    
    const handleSearch = (e) => {
        e.preventDefault();
        setOptions(formInputs);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormInputs((currentValue) => ({
            ...currentValue,
            [name]: value
        }));
    };

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
            <NavigateBar />
            <form onSubmit={handleSearch}>
                <section>
                    <label>
                        Sort By: 
                        <select name="sort_by" value={formInputs.sort_by} onChange={handleInputChange}>
                            <option value="created_at">Newest</option>
                            <option value="votes">Popularity</option>
                            <option value="title">Title</option>
                        </select>
                    </label>
                    <label>
                        Order:
                        <select name="order" value={formInputs.order} onChange={handleInputChange}>
                            <option value="desc">Descending</option>
                            <option value="asc">Ascending</option>
                        </select>
                    </label>
                    <button type="submit">Search</button>
                </section>
            </form>
            {topic ? 
                (<section>
                    <button onClick={() => navigate("/")}>Home Page</button>
                    <h3>{topic}</h3>
                </section>)
            : null}
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
