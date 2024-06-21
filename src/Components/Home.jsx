import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate, useLocation } from "react-router-dom";
import { Loading } from "./LowerComponenets/Loading";
import { ArticleList } from "./LowerComponenets/ArticleLIst";

export const Home = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, setUser } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);

    if (isLoading) {
        return <Loading />;
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
                <ArticleList isLoading={isLoading} setIsLoading={setIsLoading}/>
            </section>
        </div>
        </>
    );
};
