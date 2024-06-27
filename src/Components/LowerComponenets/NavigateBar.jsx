import { useContext, useEffect, useState } from "react";
import { getTopics } from "../../Api";
import { Loading } from "./Loading";
import { Error } from "./Error";
import { ErrorContext } from "../../contexts/ErrorContext";
import '../../css/NavigateBar.css';
import { useNavigate } from "react-router-dom";

export const NavigateBar = ({ setSelectedTopic, setSearchParams, setFormInputs, setOptions }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { error, setError } = useContext(ErrorContext);
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
                navigate("/error");
            });
    }, []);

    const handleNavClick = (topic) => {
        setSelectedTopic(topic);
    };

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <Error error={error} />;
    }

    return (
        <section className="navigate_bar">
            <nav>
                <p onClick={()=>{
                setSelectedTopic("")
                setOptions({ sort_by: "created_at", order: "desc", topic: "" })
                setFormInputs({ sort_by: "created_at", order: "desc", topic: "" })
                setSearchParams()
                navigate('/')}} className="nav_home"><img src="src/images/whiteHome.png" alt="White home icon" /></p>
                {topics.map((topic) => (
                    <div
                        key={topic.slug}
                        className="nav_item"
                        onClick={() => handleNavClick(topic.slug)}
                    >
                        {topic.slug.toUpperCase()}
                    </div>
                ))}
            </nav>
        </section>
    );
};
