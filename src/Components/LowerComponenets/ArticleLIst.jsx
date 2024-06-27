import { useState, useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loading } from "./Loading";
import { getArticles } from "../../Api";
import { NavigateBar } from "./NavigateBar";
import { Error } from "./Error";
import { ErrorContext } from "../../contexts/ErrorContext";
import "../../css/ArticleList.css"

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

    // const timeSince = (date) => {
    //     const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    //     let interval = Math.floor(seconds / 31536000);
        
    //     if (interval > 1) {
    //         return `${interval}y`;
    //     }
    //     interval = Math.floor(seconds / 2592000);
    //     if (interval > 1) {
    //         return `${interval}m`;
    //     }
    //     interval = Math.floor(seconds / 86400);
    //     if (interval > 1) {
    //         return `${interval}d`;
    //     }
    //     interval = Math.floor(seconds / 3600);
    //     if (interval > 1) {
    //         return `${interval}h`;
    //     }
    //     interval = Math.floor(seconds / 60);
    //     return `${interval}min`;
    // };

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
            <NavigateBar
                setSelectedTopic={setSelectedTopic}
                setOptions={setOptions}
                setFormInputs={setFormInputs}
                setSearchParams={setSearchParams}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
            />
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
            {selectedTopic ? <h2>{selectedTopic}</h2> : null}
            <div className="articles_container">
                {articles.map((article) => (
                    <div
                        className="article_list"
                        key={article.article_id}
                        onClick={() => handleArticleClick(article.article_id)}
                    >
                        <img
                            className="article_image"
                            src={article.article_img_url}
                            alt={article.title}
                        />
                        <h2>{article.title}</h2>
                        <p className="topic">{article.topic.toUpperCase()}</p>
                        {/* <p className="create_time">•{timeSince(article.created_at)}</p> */}
                    </div>
                ))}
            </div>
        </>
    );
    
};
