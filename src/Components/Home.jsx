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
        <div className="Header_container">
        <div className="logIn_signUp">
            {Object.keys(user).length === 0 ? (
                <section>
                    <img type="button" onClick={()=>navigate("/log_in", { state: { from: location } })} src="src/images/logIn.png" alt="Log in icon" />
                </section>
            ) : (
                <section>
                     <button type="button" onClick={() => navigate("/user")} className="username_button">
                        Hello {user.username} !
                    </button>
                </section>
            )}
            </div>
            <button type="button" onClick={()=>navigate("/currency")}>Currency</button>
            </div>
            <div>
            <section>
                <ArticleList isLoading={isLoading} setIsLoading={setIsLoading}/>
            </section>
        </div>
        </>
    );
};
