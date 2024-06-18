import { useState, useEffect } from "react";
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


    
    // if (signUp){
    //     return (
    //         <SignUp username={username} setUsername={setUsername}/>
    //     )
    // }
    



    return (
        <div>
            <section>
            <button type="button" onClick={() => navigate("/login")}>Log In</button>            {/* <button type="button" onClick={handleSignUpClick} value={signUp}> Sign Up</button> */}
            </section>
            <section>
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
            </section>
        </div>
    );
}
