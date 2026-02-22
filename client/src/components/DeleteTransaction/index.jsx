import axios from "axios"
import { useContext, useState } from "react"
import UserContext from "../../context/UserContext"

const DeleteTransaction = ({setShowDelPopup, deletingData}) => {
    const {token, allTransactions, setAllTransactions} = useContext(UserContext) // from  content Providers 
    const [isLoading, setIsLoading] = useState(false)
    
    const {_id, title, amount} = deletingData



const handleDeleteTransaction = async () => {
    try {
        setIsLoading(true)
        const URL = import.meta.env.VITE_API_URL // render
        const options = {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
        await axios.delete(
            `${URL}/user/transactions/${_id}`, options)

        // Update frontend after successful deletion
        const remainingList = allTransactions.filter(
            each => each._id !== _id
        )
        
      setAllTransactions(remainingList)
       localStorage.setItem("transactions", JSON.stringify(remainingList))
        setShowDelPopup(false)

    } catch (error) {
        console.error("Delete failed:", error.response?.data || error.message)
        setIsLoading(false)
    } finally{
               setIsLoading(false)   
            }
}

    return (
    
            <div className="top-0 -left-2 md:left-0 z-50 fixed h-screen w-screen bg-linear-to-r from-slate-900/60 to-blue-800/60 backdrop-blur-xl flex flex-col justify-center items-center">
                <div className="w-[90%] md:w-2/5 px-4 py-4 md:px-8 md:py-6 bg-slate-400 rounded-lg shadow-xl text-center flex flex-col justify-center items-center">
                <section className="w-full flex flex-col justify-center items-center">
                    <h2 className="text-white text-base md:text-xl font-bold mb-3 md:mb-4">Are you sure you want to Delete this transaction?</h2>
                    <p className="text-red-600 text-sm md:text-lg font-medium">{title}</p> 
                    <p className="text-slate-600 text-sm md:text-lg font-medium">₹ {amount}</p>
                </section>
                
                <section className="mt-10">
                    <button type="button" onClick={() => setShowDelPopup(false)} 
                    className="h-10 px-4  text-sm md:tex-base bg-gray-600/50 text-white mr-10 rounded-md cursor-pointer
                    hover:bg-gray-700/60 transition-all duration-200">Cancel</button>

                    <button type="button" onClick={handleDeleteTransaction}
                    className="h-10 px-4 text-sm md:tex-base bg-red-500 text-white rounded-md cursor-pointer
                    hover:bg-red-600 transition-all duration-200 mt-2 md:mt-0">
                    {isLoading ? "Deleting..." : "Delete"}    
                    </button>

                </section>
            </div>
        </div> 
   

    )
    
    }
    


export default DeleteTransaction