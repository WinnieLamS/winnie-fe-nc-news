import { useState, useContext } from "react";
import { postUser } from "../../Api";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

export const SignUp = () => {
  const {user, setUser} = useContext(UserContext)
  const navigate = useNavigate();
  

  function handleUserChange(e) {
    setUser((currentValue)=>{
        return {...currentValue, username: e.target.value}
    })
  }

  function handleAvatarChange(e) {
    setUser((currentValue)=>{
        return {...currentValue, avatar_url: e.target.value}
    })
  }
 
  function handleNameChange(e) {
    setUser((currentValue)=>{
        return {...currentValue, name: e.target.value}
    })
  }
 

  function handleSubmit(e) {
    e.preventDefault();
    postUser(user).then((user)=>{
        setUser(user)
        return navigate("/user");
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Username"
            onChange={handleUserChange}
            value={user.username}
            required
          />
          </div>
          <div>
          <input
            type="text"
            placeholder="Avatar Link"
            onChange={handleAvatarChange}
            value={user.avatar_url}
            required
          />
          </div>
          <div>
          <input
            type="text"
            placeholder="Name"
            onChange={handleNameChange}
            value={user.name}
            required
          />
          </div>
        <button type="submit" value={user}>
          Sign Up
        </button>
      </form>
    </>
  );
};
