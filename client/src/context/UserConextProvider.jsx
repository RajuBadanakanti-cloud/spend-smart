import { useState, useEffect} from "react";
import UserContext from "./UserContext";
import axios from "axios";


const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user")
        return storedUser ? JSON.parse(storedUser) : null
    }) // user data

    const [allTransactions, setAllTransactions] = useState(() => {
        const storedTansactions = localStorage.getItem("transactions")
        return storedTansactions ? JSON.parse(storedTansactions) : []
    })

    const [token, setToken] = useState(() => {
        return localStorage.getItem("token") || null
    })


    // login
    const login = (userData, token) => {
      
            setUser(userData)
            setToken(token)

            localStorage.setItem("user", JSON.stringify(userData))
            localStorage.setItem("token", token)
        
    }

    // logout
    const logout = () => {
        setUser(null)
        setToken(null)

        localStorage.removeItem("user")
        localStorage.removeItem("token")
    }



    
    // GETING ALL TRANSACTION FROM BACKEND 
    const [isLoading, setIsLoading] = useState(false)
     useEffect(() => { 
        const fetchigUserTransaction = async () => { 
            try{ 
                setIsLoading(true)
                const URL = import.meta.env.VITE_API_URL // render - from backend render
                 const options = {
                     headers : {
                         Authorization:`Bearer ${token}`
                    } 
                }
             const response = await axios.get(`${URL}/user/transactions`, options)
            const data = response.data.transactions 
            setAllTransactions(Array.isArray(data) ? data : [])             
             }catch(err){
                console.log(err)
                setIsLoading(false)
             } finally{
                setIsLoading(false)
             }
        } 
            fetchigUserTransaction() 
    },[token])


    return (
        <UserContext.Provider value={{user, token, login, logout, allTransactions, setAllTransactions, isLoading,  setIsLoading}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider