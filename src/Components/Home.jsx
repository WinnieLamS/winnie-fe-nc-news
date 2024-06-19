import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { getArticles, getArticleById } from "../Api";
import { Loading } from "./LowerComponenets/Loading";
import { Error } from "./LowerComponenets/Error";
import { LogIn } from "./LowerComponenets/LogIn";
import { SignUp } from "./LowerComponenets/SignUp";

export const Home = ({setArticle, isLoading, setIsLoading, error, setError}) => {
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]); 
    const [logIn, setLogIn] = useState(false);
    const [signUp, setSignUp] = useState(false);
    const { user, setUser } = useContext(UserContext);
   
    useEffect(() => {
        setIsLoading(true)
        getArticles()
        .then((articlesArrFromApi) => {
          setArticles(articlesArrFromApi.slice(0, 10));
          setIsLoading(false)
        })
        .catch((error) => {
            setError(error);
            setIsLoading(false);
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
                setError(error);
                setIsLoading(false);
              })
    };

    if (isLoading) {
        return <Loading />; 
    }

    if (error) {
        return <Error error={error} />;
      }

    function handleLogInClick (){
        setLogIn(!logIn)
    }
    function handleSignUpClick (){
        setSignUp(!signUp)
    }


    return (
        <div>
            {Object.keys(user).length === 0 ? (
                <section>
                <button type="button" onClick={() => navigate("/log_in")}>Log In</button> 
                <button type="button" onClick={() => navigate("/sign_up")}>Sign Up</button>
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
