import { useState, useContext } from "react";
import { getUser } from "../../Api";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { Error } from "./Error";

export const LogIn = ({ error, setError }) => {
    const { setUser } = useContext(UserContext);
    const [inputUsername, setInputUsername] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleClick = (e) => {
        e.preventDefault();
        getUser(inputUsername)
            .then((userFromApi) => {
                setUser(userFromApi);
                navigate(from, { replace: true });
            })
            .catch((error) => {
                setError(error);
                navigate("/error");
            });
    };

    const handleChange = (e) => {
        setInputUsername(e.target.value);
    };

    if (error) {
        return <Error error={error} />;
    }

    return (
        <>
            <form>
                <input placeholder="Username" type="text" onChange={handleChange} required />
                <button type="button" onClick={handleClick}>Log In</button>
            </form>
        </>
    );
};
