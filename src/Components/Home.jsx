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


    return (
        <>
        <div>
            {Object.keys(user).length === 0 ? (
                <section>
                    <button type="button" onClick={()=>navigate("/log_in", { state: { from: location } })}>Log In</button>
                    <button type="button" onClick={()=>navigate("/sign_up", { state: { from: location } })}>Sign Up</button>
                </section>
            ) : (
                <section>
                     <button type="button" onClick={() => navigate("/user")} className="username_button">
                        Hello {user.username} !
                    </button>
                </section>
            )}
            <section>
                <ArticleList />
            </section>
        </div>
        </>
    );
};
