import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import UserContext from "../../context/UserContext"
import { HomeIcon, ArrowLeftRight, LogOut,  User, X  } from "lucide-react";

const Header = () => {
    const {user, logout} = useContext(UserContext)
    const [isScroll, setIsScroll] = useState(false)
    const [showLogoutPopup, setshowLogoutPopup] = useState(false) // State to control the visibility of the logout confirmation popup
    const [showUserProfile, setShowUserProfile] = useState(false) // State to control the visibility of the user profile popup


    const navigation = useNavigate()

    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY > 100){
                setIsScroll(true)

            } else{
                setIsScroll(false)
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)

       
    }, [])

// Profile data    
const userName = user.user ? user.user.name : "Guest"  
const userEmail = user.user ? user.user.email : "No email available"

    return (
        <header className={`fixed top-0 left-0 h-14 md:h-20 w-screen flex justify-between items-center flex-wrap px-4 md:px-10 transition-all duration-300 ease-in-out
            ${isScroll ? "bg-linear-to-r from-slate-400/20  to-slate-600 shadow-lg backdrop-blur-md" :
             "bg-linear-to-r from-slate-100/20  to-blue-900/20 shadow-md backdrop-blur-md"}`}>

            <div className="flex justify-center items-center">
            {/* User  */}      
            <button type="button"value={showUserProfile} onClick={() => setShowUserProfile(!showUserProfile)}
             className="cursor-pointer hidden md:inline  rounded-full p-2 bg-slate-500 transition-colors duration-300 mr-4">
                <User size={16} strokeWidth={2.5} className="text-blue-50  hover:text-blue-200 transition-colors duration-300" />
            </button>

            <button type="button"value={showUserProfile} onClick={() => setShowUserProfile(!showUserProfile)}
             className="cursor-pointer md:hidden rounded-full p-1 bg-slate-500 transition-colors duration-300 mr-2">
                <User size={12} strokeWidth={2.5} className="text-blue-50  hover:text-blue-200 transition-colors duration-300" />
            </button>
            {/* Profile Popup */}
            {showUserProfile && 
                <div className=" bg-linear-to-b to-slate-200 via-blue-200  from-blue-500 px-2 md:px-4 pt-1 pb-2 md:pt-2 md:pb-4 flex flex-col justify-center items-start rounded-md fixed z-50 top-14 md:top-20 left-2 md:left-4">
                    <button onClick={() => setShowUserProfile(false)}
                    className="ml-auto -mr-1 md:-mr-2 bg-red-500 rounded-full text-white cursor-pointer hover:bg-red-600 transition-colors duration-300"><X className="h-3 md:h-4 w-3 md:w-4"/></button>
                    <h2 className="text-slate-900 text-sm md:text-base font-semibold text-center">{userName}</h2>
                    <p className="text-slate-700 text-xs md:text-sm">{userEmail}</p>
                </div>
            }


            <Link to="/">
                <h1 className="text-white text-sm md:text-xl font-bold tracking-wide cursor-pointer">SpendSmart</h1>
                <p className="text-white text-[6px] md:text-xs tracking-wider cursor-pointer">Expense Management System</p>
            </Link>
            </div>

            {/* Navigations */}
            <nav className="ml-auto flex  items-center mr-5">
                <Link to="/">
                <h1 className="mr-10 hidden md:inline text-blue-50 text-sm md:text-base font-semibold cursor-pointer
                  hover:text-blue-300  transition-colors duration-300">Dashboard</h1>
                <HomeIcon className="text-blue-50 md:hidden hover:text-blue-300 transition-colors duration-300 mr-5" size={15} />
                </Link>

                <Link to="/transactions">
                <h1 className="mr-10 hidden md:inline text-blue-50 font-semibold cursor-pointer
                  hover:text-blue-300  transition-colors duration-300">Transactions</h1>
                <ArrowLeftRight className="text-blue-50  md:hidden hover:text-blue-300 transition-colors duration-300 mr-5" size={15} />
                </Link>

            {/* Logout Popup */}    
                <button type="button" onClick={() => setshowLogoutPopup(true)}
                className="h-10 w-34 hidden md:inline bg-blue-500 text-white text-base font-semibold rounded-lg mr-4 cursor-pointer
                hover:bg-blue-600 transition-colors duration-300 ">Logout</button>

                <button type="button" onClick={() => setshowLogoutPopup(true)}
                className="cursor-pointer pr-1 py-1 rounded-md bg-blue-500/80 text-white md:hidden hover:bg-blue-600/90 transition-colors duration-300">
                <LogOut className=" text-blue-50 md:hidden hover:text-blue-200 transition-colors duration-300 ml-2 mr-0" size={16} strokeWidth={2.5}/>
                </button>




            {showLogoutPopup && 
                <div className="bg-slate-50 px-3 md:px-5 py-3 md:py-5 flex flex-col justify-center items-center rounded-md fixed z-50 top-14 md:top-20 right-6 md:right-8">
                    <h2 className="text-slate-900 text-sm md:text-base font-semibold text-center">Are you sure you want to log out?</h2>
                    
                    <section className="mt-4 flex justify-between items-center w-[80%] flex-wrap">
                        <button type="button" onClick={() => setshowLogoutPopup(false)} 
                        className="h-8 md:h-10 px-3 md:px-4 bg-gray-600/40 text-white text-sm md:text-base mr-5 rounded md:rounded-md cursor-pointer
                        hover:bg-gray-700/60 transition-all duration-200">Cancel</button>

                        <button type="button" onClick={() => {
                            logout();
                            navigation("/login")
                        }}
                        className="h-8 md:h-10 px-3 md:px-4 bg-blue-700 text-white text-sm md:text-base rounded md:rounded-md cursor-pointer
                        hover:bg-blue-800 transition-all duration-200">Conform</button>

                    </section>
                </div>
            }


         

            </nav>
        </header>
    )
}

export default Header