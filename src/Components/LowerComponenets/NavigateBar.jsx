import { useContext, useEffect, useState } from "react";
import { getTopics } from "../../Api";
import { Loading } from "./Loading";
import { Error } from "./Error";
import { ErrorContext } from "../../contexts/ErrorContext";

export const NavigateBar = ({setSelectedTopic}) => {
    const [isLoading, setIsLoading] = useState(false);
    const { error, setError } = useContext(ErrorContext);
    const [topics, setTopics] = useState([]);
    

    useEffect(() => {
        setIsLoading(true)
        getTopics()
            .then((topicsFromApi) => {
                setTopics(topicsFromApi);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
                navigate("/error");
            });
    }, []);

    const handleNavClick = (topic) => {
        setSelectedTopic(topic)
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
