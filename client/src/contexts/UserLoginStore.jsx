import { userLoginContext } from "./userLoginContext";
import { useState } from "react";

function UserLoginStore({ children }) {
  let [currentUser, setCurrentUser] = useState({});
  let [userLoginStatus, setUserLoginStatus] = useState(false);
  let [err, setErr] = useState("");

  async function loginUser(userCred) {
    try {
      let res = await fetch(`http://localhost:5000/user-api/login`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(userCred),
      });
      let result = await res.json();
      console.log(result);
      if (result.message === "login success") {
        setCurrentUser(result.user);
        setUserLoginStatus(true);
        setErr("");
        // Save token in session storage
        sessionStorage.setItem("token", result.token);
      } else {
        setErr(result.message);
        setCurrentUser({});
        setUserLoginStatus(false);
      }
    } catch (error) {
      setErr(error.message);
    }
  }

  
  function logoutUser() {
    setCurrentUser(null);
    setUserLoginStatus(false);
    setErr("");
    //remove token from session storage
    sessionStorage.removeItem("token");
  }
  return (
    <userLoginContext.Provider
      value={{
        loginUser,
        logoutUser,
        userLoginStatus,
        err,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </userLoginContext.Provider>
  );
}

export default UserLoginStore;