import { useContext, useState } from "react";
import Header from "../Header";
import UserContext from "../../context/UserContext";
import { toWords } from "number-to-words";
import { useNavigate } from "react-router-dom";
import AddTransaction from "../AddTransaction";
import { ArrowRightCircle, ArrowUp, ArrowDown  } from "lucide-react";



const Dashboard = () => {
    const {allTransactions} = useContext(UserContext)
    const [showAddTransForm, setShowAddTransForm] = useState(false) // show 
   
    const navigation = useNavigate()

// ADDING NEW TRANSACTION -------------------------------------------------

    const totalTransactions = allTransactions.length
    const totalExpense = allTransactions.reduce((total, eachTran) => {
        if(eachTran.type === "Expense"){
         return total + eachTran.amount
        }
        return total
    },0)

    const totalIncome = allTransactions.reduce((total, eachTran) => {
        if(eachTran.type === "Income"){
         return total + eachTran.amount
        }
        return total
    },0)

    const netBalance = totalIncome - totalExpense;
    const textAmount = toWords(netBalance); // words
    const totalExpenseInWords = textAmount[0].toUpperCase() + textAmount.slice(1, textAmount.length) + " rupees";
    
    const netBalanceStyle = netBalance >= 0 ? "text-green-600" : "text-red-600"
    const netBalanceIcon = netBalance >= 0 ? <ArrowUp className="h-4 w-4 md:h-5 md:w-5 inline-block ml-2 text-green-600"/> : 
    <ArrowDown className="h-4 w-4 md:h-5 md:w-5 inline-block ml-2 text-red-600"/>  


    // recent transactions
    const recentTransactions = [...allTransactions].slice(0, 4);
    return (
        <>
            <Header />
            <div className="min-h-screen w-screen bg-linear-to-r from-slate-900 to-slate-700 flex flex-col justify-start items-center pt-20">
                <div className="w-[90%] min-h-screen flex flex-col justify-start items-start mt-2 md:mt-5 mb-10">
                <h1 className="text-white text-sm md:text-xl font-bold tracking-wide border-b-3  md:border-b-4 inline-block border-blue-500  pb-2 mb-2">Personal Expense Dashboard</h1>
                <p className="text-slate-200 text-xs md:text-base w-full md:w-4/5">Track, manage, and analyze your daily expenses in one place. 
                    Monitor your spending patterns and stay in control of your financial activity.</p>

                <div className="w-full flex flex-col md:flex-row justify-center md:justify-between md:items-start mt-6 md:mt-10">
                    {/* Summary section */}
                    <section className="w-full md:min-w-1/4 md:max-w-1/2 px-4 md:px-6 py-3 md:py-4 bg-linear-to-b to-slate-200 via-blue-200  from-blue-500 rounded">
                        <h1 className="text-xs md:text-base text-white font-semibold mb-4">Summary of Expenses</h1>
                        <h2 className="text-sm md:text-xl font-semibold mb-2">Total Transactions: 
                            <span className="ml-4 text-blue-800 font-bold">{totalTransactions}</span>
                        </h2>

                        <h2 className="text-base md:text-2xl font-bold mb-2">Total Expenses: 
                            <span className="ml-4 text-blue-800 font-bold">₹ {totalExpense}</span>
                        </h2>

                        <h2 className="text-base md:text-2xl  font-bold mb-2">Total Income: 
                            <span className="ml-4 text-blue-800 font-bold">₹ {totalIncome}</span>
                        </h2>

                        <h2 className="text-base md:text-2xl font-bold mb-2">Net Balance: 
                            <span className={`ml-4 ${netBalanceStyle} font-bold`}>₹ {netBalance} {netBalanceIcon}</span>
                        </h2>

                 
                        <p className="text-[10px] md:text-xs text-black tracking-wide">{totalExpenseInWords}</p>

                    </section>

                    {/* Add Transactions Button */}
                    <section className="w-full md:w-60 lg:w-90 flex flex-col justify-center items-center bg-linear-to-r to-blue-200 from-blue-600 rounded mt-4 md:mt-0">
                        <button type="button" onClick={() => {setShowAddTransForm(true)}}
                        className="h-12 md:h-18 w-full text-white text-base md:text-xl font-semibold  rounded cursor-pointer
                        hover:bg-blue-600 transition-colors duration-200">+ Add Transaction</button>
                    </section>
                    
                </div>

                {/* Recent Transactions */}
                    <div className="w-full mt-6 md:mt-10 mb-10 md:mb-5">
                        <h1 className="text-slate-50 text-sm md:text-base">Recent Transactions</h1>
                        {recentTransactions.length === 0 ? (
                            <div className="w-full flex flex-col justify-center items-start text-center mt-5 md:mt-10">
                                <h1 className="text-white/80 text-sm md:text-xl font-medium">No transactions found.</h1>
                            </div>                        ) :
                        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
                            { recentTransactions.map((each) => {
                                const typeStyle = each.type === "Expense" ? "bg-red-600/60 text-white" : "bg-green-600/60 text-white"
                                const amountStyle = each.type === "Expense" ? "text-red-600" : "text-green-600"
                                return (
                                <li  key={each._id} className="min-h-24 md:min-h-32 min-w-60 md:min-w-40 bg-white px-5 py-3 text-black rounded-md md:rounded-lg shadow-md
                                hover:shadow-xl transition-shadow duration-200">
                            
                                    <h2 className="text-base md:text-lg text-slate-800 font-bold">{each.title}</h2>

                                    <section className="flex justify-between items-start mt-2 mb-2 md:mb-3">
                                    <h2 className={`text-base md:text-xl font-bold ${amountStyle} mr-2`}>₹ {each.amount}</h2>
                                    <p className={`px-3 py-1 text-xs md:text-sm font-semibold rounded-lg md:rounded-2xl inline-block mb-2 ${typeStyle}`}>{each.type}</p>
                                    </section>

                                    <p className="text-xs md:text-sm px-3 py-1 bg-blue-100 inline-block rounded-2xl mb-2">{each.category}</p>
                                    <p className="text-xs md:text-sm font-medium text-slate-800 mb-2">Date: {each.date}</p>
                                    <p className="text-[10px] md:text-sm text-slate-600">{each.notes}</p>

                                </li>
                                
                            )})}
                        </ul>
                        }
                    </div>
                
                {/* View All Transactions */}
                <button type="button" onClick={() =>  navigation("/transactions")} 
                className="h-10 md:h-12 px-4 py-1 md:px-5 md:py-2 bg-blue-500 text-white text-sm md:text-base font-semibold rounded-lg cursor-pointer
                hover:bg-blue-600 transition-colors duration-200">
                    View All Transactions
                        <ArrowRightCircle  className="h-4 md:h-5 w-4 md:w-5 inline ml-2"/>
                </button>

                {/* Add */}
                {showAddTransForm && <AddTransaction onClose={() => setShowAddTransForm(false)}/>}
                </div>
            </div>
            
        </>
    );
};

export default Dashboard;
