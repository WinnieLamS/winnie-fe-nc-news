import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate, useLocation } from "react-router-dom";
import { Loading } from "./LowerComponenets/Loading";
import { ArticleList } from "./LowerComponenets/ArticleLIst";
import logInIcon from '../images/logIn.png';

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
                            <img
                                type="button"
                                onClick={() => navigate("/log_in", { state: { from: location } })}
                                src={logInIcon}
                                alt="Log in icon"
                            />
                        </section>
                    ) : (
                        <section>
                            <h3
                                type="button"
                                onClick={() => navigate("/user")}
                                className="username_button"
                            >
                                Hello {user.username}
                            </h3>
                        </section>
                    )}
                </div>
            </div>
            <div>
                <section>
                    <ArticleList isLoading={isLoading} setIsLoading={setIsLoading} />
                </section>
            </div>
        </>
    );
};
