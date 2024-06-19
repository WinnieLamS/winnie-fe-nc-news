import { useContext } from "react"
import { UserContext } from "../contexts/UserContext"
import { useNavigate } from "react-router-dom";


export const User = () => {
    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext)

    function handleLogOutClick() {
        setUser({})
        return navigate("/")
    }

    return (
        <>
        <nav>
            <p>nav to other pages</p>
        </nav>
        <section>
        <h2>Hello {user.username} !</h2>
        <img className="user_img" src={user.avatar_url} alt={user.username} />
        <h3>Name: {user.name}</h3>
        </section>
        <section className="user_comment">
            <p>get comment by username later</p>
        </section>
        <section>
            <button onClick={handleLogOutClick}>Log Out</button>
        </section>
        </>
    )
}