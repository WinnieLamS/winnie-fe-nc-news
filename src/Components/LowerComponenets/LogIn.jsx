import { useState, useContext } from "react"
import { getUser } from "../../Api";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";



export const LogIn = ({ setError}) => {
    const {user, setUser} = useContext(UserContext)
    const [inputUsername, setInputUsername] = useState("");
    const navigate = useNavigate();

    function handleClick (){
        getUser(inputUsername).then((userFromApi) => {  
            console.log(userFromApi, "userFromApi");     
            setUser(userFromApi)
            // return navigate("/user");
        })
        .catch((error) => {
            setError(error);
        });   
    }

    function handleChange (e) {
        setInputUsername(e.target.value)
    }

    

    return (
        <>
        <form >
            <input placeholder="Username" type="text" onChange={handleChange} required />
            <button type="button" onClick={handleClick} value={inputUsername}>Log In</button>
        </form>
        </>
    )
}