import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { getTopics } from "../../Api";
import { Loading } from "./Loading";
import { Error } from "./Error";

export const NavigateBar = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        getTopics()
            .then((topicsFromApi) => {
                setTopics(topicsFromApi);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });
    }, []);

    const handleNavClick = (topic) => {
        navigate(`/articles/${topic}`);
    };

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <Error error={error} />;
    }

    return (
        <section className="navigate_bar">
            <nav style={{ display: "flex", justifyContent: "space-between" }}>
                    {topics.map((topic) => (
                        <div key={topic.slug} style={{ margin: "10px" }}>
                            <button onClick={() => handleNavClick(topic.slug)}>{topic.slug}</button>
                        </div>
                    ))}
            </nav>
    </section>
    );
};
