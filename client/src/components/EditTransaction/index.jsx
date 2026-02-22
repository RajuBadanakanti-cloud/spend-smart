import { useContext, useState } from "react";

import UserContext from "../../context/UserContext";
import axios from "axios";
import {Loader} from "lucide-react"

  

  
  // EDIT TRANSACTION
    const EditTransaction = ({editingData, setShowEditPopup}) => {
    const {_id,title,amount, type, category, date, notes} = editingData
    const {token, setAllTransactions} = useContext(UserContext)
    const [isLoading, setIsloading] = useState(false)

    const [showErrMsg, setShowErrMsg] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")

    const [formData, setFormData] = useState({
        id:_id,
        title:title,
        type:type,
        amount:amount,
        category:category,
        date:date,
        notes:notes
    })



// ----------------------------------------------------
        // add submiting Form >>
        const handleForm = async (event) => {
            event.preventDefault()
            try {
                setIsloading(true)

                const URL = "http://localhost:5000"
                const options = {
                    headers:{
                        Authorization:`Bearer ${token}`,
                        
                    },
                    
                }
                const response = await axios.put(`${URL}/user/transactions/${formData.id}`,formData ,options)
                const updateTransaction = response.data.transaction // new added
           
                setAllTransactions(prev => prev.map(each => 
                    each._id === updateTransaction._id ? updateTransaction : each)) // UPDATED Instalty
                    
                setShowEditPopup(false)

                const refreshForm = {
                        title:"",
                        amount:1,
                        type:"Expense",
                        category:"Food",
                        date:"",
                        notes:""
                    }
                setFormData(refreshForm)
                    
            }catch(err){
                setShowErrMsg(true)
                setErrorMsg(err.response.data.message || "Server Error!")
            }finally{
                setIsloading(false)   
            }
            
        }

        return (
            <div className="top-0 -left-2 md:left-0 z-50 fixed h-screen w-screen bg-linear-to-r from-slate-900/60 to-blue-800/60 backdrop-blur-xl flex flex-col justify-center items-center">
                <div className="w-[90%] md:w-2/3 lg:w-1/3 px-5 md:px-8 py-4 md:py-6 bg-slate-500 rounded-lg shadow-xl">
                    <form  id="update-transaction-form" onSubmit={handleForm} className="w-full">
                        {/* Title */}
                        <section className="w-full flex flex-col justify-center items-start mb-4">
                            <label htmlFor="title" className="text-white text-sm md:text-base font-semibold mb-2">Title</label>
                            <input id="title" type="text" maxLength={90} placeholder="e.g. House Rent"
                            value={formData.title} onChange={(event) => setFormData(prev => ({...prev, title:event.target.value}))}
                            className="h-10 w-full text-sm md:text-base text-black px-4 bg-slate-200 rounded-lg outline-none
                            focus:ring-blue-500 focus:ring-2"/>
                        </section>

                        {/* Amount */}
                        <section className="w-full flex flex-col justify-center items-start mb-4" placeholder="e.g. Rent">
                            <label htmlFor="amount" className="text-white text-sm md:text-base font-semibold mb-2">Amount</label>
                            <input id="amount" type="number" step="1" max={10000000} required placeholder="e.g. 8000" 
                            value={formData.amount} onChange={(event) => setFormData(prev => ({...prev, amount:Number(event.target.value)}))}
                            className="h-10 w-full text-sm md:text-base text-black px-4 bg-slate-200 rounded-lg outline-none
                            focus:ring-blue-600 focus:ring-2"/>
                        </section>

                        {/* Type Income/Expense */}
                        <section className="w-full flex flex-col justify-center items-start mb-4">
                            <label htmlFor="type" className="text-white text-sm md:text-base font-semibold mb-2">Type</label>
                            <select id="type" value={formData.type} onChange={(event) => setFormData(prev => ({...prev, type:event.target.value}))}
                            className="h-10 w-full text-sm md:text-base bg-slate-200 text-black px-4 rounded-lg outline-none cursor-pointer">
                                <option value="Income" className="text-blue-950 font-semibold">Income</option>
                                <option value="Expense" className="text-blue-950 font-semibold">Expense</option>
                            </select>
                        </section>

                        {/* Category */}
                        <section className="w-full flex flex-col justify-center items-start mb-4">
                            <label htmlFor="category" className="text-white text-sm md:text-base font-semibold mb-2">Category</label>
                            <select id="category" value={formData.category} onChange={(event) => setFormData(prev => ({...prev, category:event.target.value}))}
                            className="h-10 w-full text-sm md:text-base bg-slate-200 text-black px-4 rounded-lg outline-none cursor-pointer">
                                <option className="font-semibold">Food</option>
                                <option className="font-semibold">Rent</option>
                                <option className="font-semibold">Loan</option>
                                <option className="font-semibold">Transport</option>
                                <option className="font-semibold">Shopping</option>
                                <option className="font-semibold">Health</option>
                                <option className="font-semibold">Other</option>
                            </select>
                        </section>

                        {/* Date */}
                        <section className="w-full flex flex-col justify-center items-start mb-4 ">
                            <label htmlFor="date" className="text-white text-sm md:text-base font-semibold mb-2">Date</label>
                            <input id="date" type="date" required placeholder="e.g. 12/02/2026"
                            value={formData.date} onChange={(event) => setFormData(prev => ({...prev, date:event.target.value}))}
                            className="h-10 w-full text-sm md:text-base text-black px-4 bg-slate-200 rounded-lg outline-none
                            focus:ring-blue-600 focus:ring-2"/>
                        </section>

                        {/* Notes */}
                        <section className="w-full flex flex-col justify-center items-start mb-10">
                            <label htmlFor="note" className="text-white text-sm md:text-base font-semibold mb-2">Note</label>
                            <textarea id="note" rows={2} maxLength={300} type="text" placeholder="e.g. Paid February rent successfully"
                            value={formData.notes} onChange={(event) => setFormData(prev => ({...prev, notes:event.target.value}))}
                            className="w-full resize-none text-sm md:text-base text-black px-4 py-2 bg-slate-200 rounded-lg outline-none
                            focus:ring-blue-600 focus:ring-2"></textarea>
                        </section>

                        {/* Error Message */}
                        {showErrMsg &&
                            <p className="px-2 py-1 bg-red-500/10 border border-red-600 rounded-lg text-xs md:text-sm text-center text-red-800 tracking-wide mb-2">
                            {errorMsg}</p> 
                        }

                        {/* Add and Cancel Buttons */}
                        <section className="w-full flex flex-row justify-between items-center mb-5">
                        <button type="button" onClick={() => setShowEditPopup(false)}
                        className="h-10 md:h-12 w-40 text-sm md:text-base px-2 text-white font-semibold bg-gray-600 rounded-lg cursor-pointer
                        hover:bg-gray-700  transition-colors duration-300 mr-5">Cancel</button>

                        <button type="submit"
                        className="h-10 md:h-12 w-40 text-sm md:text-base px-2 text-white font-semibold bg-blue-600 rounded-lg flex flex-row justify-center items-center cursor-pointer
                        hover:bg-blue-700 transition-colors duration-300">
                        {isLoading ? "Updating...": "Update"}
                        {isLoading && <Loader  className="ml-2 h-4 md:h-5 w-4 md:w-5 animate-spin"/> }
                        </button>
                        </section>

                    </form>
                </div>
            </div>
        )
    }

    export default EditTransaction