import { useContext, useEffect, useState } from "react"
import { UserContext } from "../contexts/UserContext"
import { useNavigate } from "react-router-dom";

export const User = ({}) => {
    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext)
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);



    function handleLogOutClick() {
        setUser({})
        return navigate("/")
    }


    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <Error error={error} />;
    }

    return (
        <>
        <img className="user_img" src={user.avatar_url} alt={user.username} />
        <h3>Userame: {user.username}</h3>
        <h3>Name: {user.name}</h3>
        <button onClick={handleLogOutClick}>Log Out</button>
        </>
    )
}