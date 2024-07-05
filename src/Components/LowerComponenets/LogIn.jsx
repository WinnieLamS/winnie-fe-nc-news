import { useState, useContext } from "react";
import { getUser } from "../../Api";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { ErrorContext } from "../../contexts/ErrorContext";
import { Error } from "./Error";
import { Loading } from "./Loading";
import "../../css/LogIn.css";

export const LogIn = () => {
    const { setUser } = useContext(UserContext);
    const { error, setError } = useContext(ErrorContext);
    const [inputUsername, setInputUsername] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleClick = (e) => {
        e.preventDefault();
        setIsLoading(true);
        getUser(inputUsername)
            .then((userFromApi) => {
                setUser(userFromApi);
                navigate(from, { replace: true });
            })
            .catch((error) => {
                setError({ message: error.response.data.msg});
                setIsLoading(false);
                return navigate("/error");
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 
        handleClick(e); 
    };

    const handleChange = (e) => {
        setInputUsername(e.target.value);
    };

    if (isLoading) {
        return <Loading />;
    }
    if (error) {
        return <Error error={error} />;
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Username"
                    type="text"
                    value={inputUsername}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Log In</button>
            </form>
            <section className="goToSignUp">
                <h3>Don’t have an NC account?</h3>
                <button
                    id="register"
                    type="button"
                    onClick={() => navigate("/sign_up", { state: { from: location } })}
                >
                    Register now
                </button>
            </section>
        </>
    );
};
