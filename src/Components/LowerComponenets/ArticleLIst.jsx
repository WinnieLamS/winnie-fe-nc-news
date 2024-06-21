import { useState, useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loading } from "./Loading";
import { getArticles } from "../../Api";
import { NavigateBar } from "./NavigateBar";
import { Error } from "./Error";
import { ErrorContext } from "../../contexts/ErrorContext";

export const ArticleList = () => {
    const navigate = useNavigate();
    const { error, setError } = useContext(ErrorContext);
    const [articles, setArticles] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    


    const initialSortBy = searchParams.get("sort_by") || "created_at";
    const initialOrder = searchParams.get("order") || "desc";
    const initialTopic = searchParams.get("topic") || selectedTopic || "";

 
    const [options, setOptions] = useState({
        sort_by: initialSortBy,
        order: initialOrder,
        topic: initialTopic
    });

    const [formInputs, setFormInputs] = useState({
        sort_by: initialSortBy,
        order: initialOrder,
        topic: initialTopic
    });


    useEffect(() => {
        if (selectedTopic) {
            setOptions((currentValue) => ({
                ...currentValue,
                topic: selectedTopic
            }));
            setFormInputs((currentValue) => ({
                ...currentValue,
                topic: selectedTopic
            }));
            setSearchParams((currentValue) => ({
                ...currentValue,
                topic: selectedTopic,
                sort_by: formInputs.sort_by,
                order: formInputs.order
            }));
        }
    }, [selectedTopic, setSearchParams]);


    const fetchArticles = () => {
        setIsLoading(true);
        getArticles(options)
        .then((articlesArrFromApi) => {
            setArticles(articlesArrFromApi);
            setIsLoading(false);
        })
        .catch((error) => {
            setError({ message: error.response.data.msg});
            setIsLoading(false);
            return navigate("/error")
        });     
    };
    
    useEffect(() => {
        fetchArticles();
    }, [options]);

    const handleSearch = (e) => {
        e.preventDefault();
        setOptions(formInputs);
        setSearchParams(formInputs);
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
            <NavigateBar setSelectedTopic={setSelectedTopic} 
            isLoading={isLoading} setIsLoading={setIsLoading}/>
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
            {selectedTopic ? (
                <section>
                    <button onClick={() => {
                        setSelectedTopic("")
                        setOptions({ sort_by: "created_at", order: "desc", topic: "" });
                        setFormInputs({ sort_by: "created_at", order: "desc", topic: "" });
                        setSearchParams();
                    }}>Home Page</button>
                    <h3>{selectedTopic}</h3>
                </section>
            ) : null}
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
