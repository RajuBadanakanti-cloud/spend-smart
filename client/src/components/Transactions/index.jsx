import { useContext, useState } from "react"
import Header from "../Header"
import UserContext from "../../context/UserContext"
import AddTransaction from "../AddTransaction"
import EditTransaction from "../EditTransaction"
import DeleteTransaction from "../DeleteTransaction"
import { useEffect } from "react"
import axios from "axios"
import { PlusCircle } from "lucide-react";

// ["Food", "Rent", "Loan", "Transport", "Shopping", "Health", "Other"]
const CATEGORY_TRANSACTION =  [ 
    {
        id:0,
        category:"All",
    },
    {
        id:1,
        category:"Food",
    },
    {
        id:2,
        category:"Rent",
    },
    {
        id:3,
        category:"Loan",
    },
    {
        id:4,
        category:"Transport",
    },
    {
        id:5,
        category:"Shopping",
    },
    {
        id:6,
        category:"Health",
    },
    {
        id:7,
        category:"Other",
    }
]

const Transactions = () => {
    const {allTransactions,token, setAllTransactions} = useContext(UserContext)
    const [activeTab, setActiveTab] = useState("All")
    const [showDeletePopup ,setShowDelPopup] = useState(false) // show delete conformation popup
    const [deletingData, setDeletingData] = useState({}) // deleting...

    const [showAddTransaction, setShowAddTransaction] = useState(false)
    const [showEditPopup, setShowEditPopup] = useState(false)
    const [editingData, setEditingData] = useState({})

    const [searchInput, setSearchInput] = useState("") // SEARCH Transactions
    const [sortingBy, setSortingBy] = useState("-createdAt")
    
    const [page, setPage] = useState(1) // Pagination
    const [limit, setLimit] = useState(10) // Limit of transactions per page
   
// --------------------------------------------------------------------------------------
    useEffect(() => {
        const handleSorting = async () => {
            try{    
                const URL = "http://localhost:5000"
                const options = {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }

                const sortBy = sortingBy // From input
                const category = activeTab // From selected Tabs
                const response = await axios.get(`${URL}/user/transactions?page=${page}&limit=${limit}&category=${category}&sort=${sortBy}`, options)
                const data = response.data.transactions 
                setAllTransactions(data)

            }catch(err){
                console.log(err)
            }
        }

        handleSorting()
    })

// ------------------------------------------------------------------------------------------------
    const filteredTransactions = allTransactions.filter(each => each.category === activeTab) 
    const TRANSACTIONS_LIST = activeTab === "All" ? allTransactions : filteredTransactions

    const searchingTransactions = TRANSACTIONS_LIST.filter(each => 
        each.title.toLowerCase().includes(searchInput.toLowerCase()) || 
        each.amount.toString().includes(searchInput) || each.type.toLowerCase().includes(searchInput.toLowerCase())) 
     
// ------------------------------------------------------------------------------------------    
    return (
        <>
        <Header/>
        <div className="min-h-screen w-screen bg-linear-to-t from-slate-900 to-slate-700 pt-20 flex flex-col justify-start items-center">
        { /* Content  */ }
        <div className="w-[90%] min-h-screen flex flex-col justify-start items-start mt-2 md:mt-5 mb-10">
            {/* Top Section */}      
            <section className="w-full md:w-4/5  mr-0 md:mr-5">
            <h1 className="text-white text-sm md:text-xl font-bold tracking-wide border-b-3 md:border-b-4 inline border-blue-500 pb-2">Transaction Explorer</h1>
             <p className="text-slate-200 text-xs md:text-base mt-5">Browse, search, and filter your recorded transactions. 
                Manage your expense history efficiently with advanced filtering and scalable data loading.</p>
            </section>


            {/* Search Section  */}
            <section className="w-full md:w-[80%] lg:w-[70%] mt-6 md:mt-10">
                <input type="search" id="search" placeholder="Search By the Title or Amount or Type"
                value={searchInput} onChange={(event) => setSearchInput(event.target.value)}
                className="bg-slate-50 text-sm md:text-base h-10 md:h-12 w-full px-4 py-2 rounded outline-none
                 focus:ring-2 focus:ring-blue-500"/>
            </section>

            {/* Sorting Section */}
            <select name="sorting" value={sortingBy} onChange={(event) => setSortingBy(event.target.value)}
            className="border bg-slate-50 font-semibold border-gray-300 p-2 rounded mt-4 md:mt-5 
             focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm md:text-base">
                <option value="-date">Newest First</option>
                <option value="date">Oldest First</option>
                <option value="-amount">Amount:  High → Low</option>
                <option value="amount">Amount:  Low → High</option>
            </select>
            {/* Pagination */}
            <section className="mt-2 mr-2 md:mr-0">
                <label  htmlFor="Page" className="text-white font-semibold text-sm md:text-base mr-2">Page</label>
                <input id="Page" type="number" min={1} max={100}  placeholder="Max: 100"
                value={page} onChange={(event) => setPage(event.target.value)}
                className="h-8 w-22 md:h-10 md:w-30 p-2 text-sm md:text-base bg-slate-50 rounded outline-none focus:ring-2 focus:ring-blue-500"/>
            </section>

            <section className="mt-2">
                <label htmlFor="limit" className="text-white font-semibold text-sm md:text-base  mr-2">Limit</label>
                <input id="limit" type="number" min={1} max={1000} placeholder="Max: 1000"
                value={limit} onChange={(event) => setLimit(event.target.value)}
                className="h-8 w-22 md:h-10 md:w-30 p-2 text-sm md:text-base bg-slate-50 rounded outline-none  focus:ring-2 focus:ring-blue-500"/>
            </section>


            {/* Tabs section */}
            <div className="w-full flex flex-col md:flex-row justify-center md:justify-between  items-start md:items-center mt-10 mb-10">
            <ul className="w-full flex justify-start items-center flex-wrap mb-4 md:mb-0">
              {CATEGORY_TRANSACTION.map(each => {
                const isActive = activeTab === each.category
                const activeStyles = isActive ? "bg-blue-700 hover:bg-blue-600" : "bg-slate-600 hover:bg-slate-500"
              return (
                <li key={each.id} className="mr-4 md:mr-8 mb-4 sm:mb-4 lg:mb-2">
                <button
                    onClick={() => setActiveTab(each.category)}
                    className={`${activeStyles} px-3 md:px-4 py-1 md:py-2 text-white text-sm md:text-base font-semibold rounded-sm md:rounded-xl cursor-pointer
                    transition-all duration-200`}>
                    {each.category}
                </button>
                </li>
                           
             )
            })}  
            </ul>

            <button onClick={() => setShowAddTransaction(true)}
             className="h-12 md:h-14 w-full md:w-80 lg:w-76 text-white font-bold bg-blue-500 flex items-center justify-center gap-2 rounded shadow-blue-500/40 shadow-xl 
             cursor-pointer hover:bg-blue-600 transition-colors duration-200 ml-0 md:ml-5">
                <PlusCircle className="h-4 w-4 md:h-5 md:w-5"/>
                 Add New Transaction</button>

          </div>

            {/* Transactions CARD section */}

            {searchingTransactions.length === 0 ? (
            <div className="w-full flex flex-col justify-center items-center text-center mt-5 md:mt-10">
                <h1 className="text-white/80 text-sm md:text-xl font-medium">No transactions found.</h1>
                <p className="text-white/40 tracking-wide text-xs md:text-base mt-1">You haven’t recorded any transactions. 
                Start by adding your first transaction to track your activity.</p>
            </div>
            ) : 

            <ul className="max-h-125 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-scroll scrollbar-custom">
              {searchingTransactions.map(each =>{
                const typeStyle = each.type === "Expense" ? "bg-red-600/60 text-white" : "bg-green-600/60 text-white"
                const amountStyle = each.type === "Expense" ? "text-red-600" : "text-green-600"
                 return (
                <li key={each._id} className="min-w-50 bg-white px-5 py-4 rounded-md shadow-blue-950 shadow-xl">
                    <h2 className="text-sm md:text-lg text-slate-800 font-bold">{each.title}</h2>
                    <section className="flex justify-between items-start mt-2">
                        <h2 className={`text-sm md:text-xl ${amountStyle} font-bold mb-2 mr-4`}> ₹ {each.amount}</h2>
                        <p className={`px-3 md:px-4 py-1 text-xs md:text-sm font-semibold bg-blue-200 rounded-md md:rounded-4xl inline-block mb-4 ${typeStyle}`} >{each.type}</p>
                    </section>
                    <p className="px-4 py-1 text-xs md:text-sm font-semibold bg-blue-200 rounded-xl md:rounded-4xl inline-block mb-2 md:mb-4">{each.category}</p>
                    <p className="font-semibold text-sm md:text-base text-slate-800 mb-2">Date: {each.date}</p>
                    <p className="text-slate-600 text-xs md:text-sm mb-4">{each.notes}</p>

                    {/* delete and edit buttons */}
                    <div className="w-full flex justify-start items-center flex-wrap mt-auto">             
                        <button type="button" onClick={() => 
                        {setShowDelPopup(true)
                        setDeletingData(each)}}
                        className="h-8 px-4 md:px-2 text-white bg-red-500 text-xs md:text-sm font-semibold rounded mr-5 cursor-pointer
                        hover:bg-red-600 transition-all duration-200">
                        Delete
                        </button>

                        <button
                        type="button"
                        onClick={() => {
                            setShowEditPopup(true)
                            setEditingData(each)
                            }   
                        }
                        className="h-8 px-4 md:px-2 text-white bg-slate-500 text-xs md:text-sm font-semibold rounded cursor-pointer
                        hover:bg-slate-600 transition-all duration-200">
                            Edit
                        </button>   
                    </div>
                
                </li>                       
             )})}  
            </ul>
        }



            {/* Add Transaction */}
            {showAddTransaction && <AddTransaction onClose={() => setShowAddTransaction(false)} />}
            {/* Edit Transaction */}
            {showEditPopup && <EditTransaction setShowEditPopup={setShowEditPopup} editingData={editingData}/>}
            {/* Delete Transaction */}
            {showDeletePopup && <DeleteTransaction setShowDelPopup={setShowDelPopup} deletingData={deletingData}/>}

        </div>
        </div>
        </>
    )
}

export default Transactions