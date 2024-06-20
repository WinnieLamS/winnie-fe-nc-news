import { useContext, useEffect, useState } from "react"
import { UserContext } from "../contexts/UserContext"
import { useNavigate } from "react-router-dom";
import { CommentCard } from "./LowerComponenets/CommentCard";
import { NavigateBar } from "./LowerComponenets/NavigateBar";


export const User = ({}) => {
    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext)
    const [userComment, setUserComment] = useState([])
    const [isLoading, setIsLoading] = useState(false);



    function handleLogOutClick() {
        setUser({})
        return navigate("/")
    }

    return (
        <>
        <NavigateBar />
        <section>
        <h2>Hello {user.username} !</h2>
        <img className="user_img" src={user.avatar_url} alt={user.username} />
        <h3>Name: {user.name}</h3>
        </section>
        <section>
            <button onClick={handleLogOutClick}>Log Out</button>
        </section>
        </>
    )
}