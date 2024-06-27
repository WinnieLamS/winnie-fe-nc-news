import { useState, useContext } from "react";
import { getUser } from "../../Api";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { ErrorContext } from "../../contexts/ErrorContext";
import { Error } from "./Error";
import { Loading } from "./Loading";

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
                return navigate("/error")
            });
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
        <p onClick={()=>{navigate('/')}} className="back_home">
            <img src="src/images/greyHome.png" alt="Grey home icon" />
            </p>
            <form>
                <input placeholder="Username" type="text" onChange={handleChange} required />
                <button type="button" onClick={handleClick}>Log In</button>
            </form>
            <h3>Don’t have a NC account?</h3>
            <button type="button" onClick={()=>navigate("/sign_up", { state: { from: location } })}>Register now</button>
        </>
    );
};
