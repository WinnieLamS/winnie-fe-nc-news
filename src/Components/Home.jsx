import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate, useLocation } from "react-router-dom";
import { Loading } from "./LowerComponenets/Loading";
import { Error } from "./LowerComponenets/Error";
import { NavigateBar } from "./LowerComponenets/NavigateBar";
import { ArticleList } from "./LowerComponenets/ArticleLIst";

export const Home = ({ setArticle, isLoading, setIsLoading, error, setError }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const { user, setUser } = useContext(UserContext);

 
    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <Error error={error} />;
    }


    const handleLogInClick = () => {
        navigate("/log_in", { state: { from: location } });
    };

    const handleSignUpClick = () => {
        navigate("/sign_up", { state: { from: location } });
    };

    return (
        <>
        <NavigateBar />
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
                <ArticleList />
            </section>
        </div>
        </>
    );
};
