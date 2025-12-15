import { createContext, useState } from "react"
import { getUserFromToken, removeToken } from "../utils/token"

const UserContext = createContext()

const UserProvider = ({ children }) => {

  const [user, setUser] = useState(getUserFromToken())

  const signOut = () => {
    removeToken()
    setUser(null)
  }

  return (
    <UserContext.Provider value={{ user, setUser, signOut }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }