import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate, useLocation } from "react-router-dom";
import { getArticles } from "../Api";
import { Loading } from "./LowerComponenets/Loading";
import { Error } from "./LowerComponenets/Error";

export const Home = ({ setArticle, isLoading, setIsLoading, error, setError }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [articles, setArticles] = useState([]);
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        setIsLoading(true);
        getArticles()
            .then((articlesArrFromApi) => {
                setArticles(articlesArrFromApi.slice(0, 10));
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <Error error={error} />;
    }

    const handleArticleClick = (article_id) => {
        navigate(`/articles/${article_id}`);
    };

    const handleLogInClick = () => {
        navigate("/log_in", { state: { from: location } });
    };

    const handleSignUpClick = () => {
        navigate("/sign_up", { state: { from: location } });
    };

    return (
        <div>
            {Object.keys(user).length === 0 ? (
                <section>
                    <button type="button" onClick={handleLogInClick}>Log In</button>
                    <button type="button" onClick={handleSignUpClick}>Sign Up</button>
                </section>
            ) : (
                <section>
                    <h3 className="home_username">{user.username}</h3>
                    <button className="log_out" type="button" onClick={() => setUser({})}>Log out</button>
                </section>
            )}
            <section>
                <h3>The Ten Latest News:</h3>
                {articles.map((article) => (
                    <div
                        className="article_list"
                        key={article.article_id}
                        onClick={() => handleArticleClick(article.article_id)}
                    >
                        <h4>{article.title}</h4>
                        <p>Author: {article.author}</p>
                        <img
                            className="article_image"
                            src={article.article_img_url}
                            alt={article.title}
                        />
                    </div>
                ))}
            </section>
        </div>
    );
};
