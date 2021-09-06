import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect, logout, isLoading, user } = useAuth0();
  return (
    <div>
      {!isLoading && !user && (
        <button className="btn btn-primary login-btn" onClick={() => loginWithRedirect()}>Log in</button>
      )}
       {!isLoading && user && (
        <button className="btn btn-primary login-btn" onClick={() => logout()}>Log out</button>
      )}
    </div>
  );
};

export default LoginButton;
