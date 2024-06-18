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
        <h1>user details</h1>
        <section>
            <button onClick={handleLogOutClick}>Log Out</button>
        </section>
        </>
    )
}