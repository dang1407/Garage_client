import React, {useState} from "react";
import AccessTokenContext from "./AccessTokenContext";

const AppWrapper =  ({children}) => {
      const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
      const [role, setRole] = useState(null)
      const handleLogin = (token, role) => {
            setAccessToken(token)
            setRole(role)
      }

      return (
            <AccessTokenContext.Provider value={{accessToken, role, handleLogin}}>
                  {children}
            </AccessTokenContext.Provider>
      )
}

export default AppWrapper;