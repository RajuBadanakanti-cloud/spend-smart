import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useState,} from "react"
import { Loader } from "lucide-react";

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const [showErrMsg, setShowErrMsg] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const navigation = useNavigate()


     const handleForm = async (event) => {
        event.preventDefault()
        try{
            setIsLoading(true)
            const userDetails = {
                name,
                email,
                password
            }

            const URL = "http://localhost:5000"
         /* fetch >>   const options = {
                method:"POST",
                header:{
                    "Content-Type":"application/Json",
                },
                body:JSON.stringify(userDetails)
            } */

            const response = await axios.post(`${URL}/auth/register`, userDetails)
            const data = response.data
            
            console.log(data, "registration")
            navigation("/login", {replace:true})
        

        }catch(err){
            const errorMsg = err.response?.data?.message || "Something went wrong"

           setShowErrMsg(true)
           setErrorMsg(errorMsg)
           setIsLoading(false)

        }finally{
            setIsLoading(false)
        }
    }

    return (
        <div className='h-screen w-screen bg-linear-to-r from-slate-900 to-slate-700 flex flex-col justify-center items-center fixed'>
            {/*  CARD */}
            <div className="w-[90%] sm:w-[70%] lg:w-1/3 px-6 py-6 md:px-10 md:py-10 bg-slate-600 rounded-lg shadow-lg">
            <h1 className="font-bold text-blue-500 text-shadow-blue-900 text-shadow text-center">Register</h1>
                <form id="register-form" onSubmit={handleForm} className="w-full mt-5">
                    {/* NAME */}
                    <section className="w-full flex flex-col justify-center items-start mb-5">
                        <label htmlFor="name" className="text-white text-base md:text-lg  font-semibold mb-2">Name</label>
                        <input id="name" type="text" minLength={1} value={name} required onChange={(event) =>  setName(event.target.value)}
                        className="h-10 md:h-12 w-full text-base text-black px-5 bg-slate-200 rounded-lg outline-none
                        focus:ring-blue-500 focus:ring-2"/>
                    </section>

                    {/* EMAIL */}
                    <section className="w-full flex flex-col justify-center items-start mb-5">
                        <label htmlFor="email" className="text-white  text-base md:text-lg font-semibold mb-2">Email</label>
                        <input id="email" type="email" value={email} required onChange={(event) => {setEmail(event.target.value), setShowErrMsg(false)}}
                        className="h-10 md:h-12 w-full text-sm md:text-base text-black px-5 bg-slate-200 rounded-lg outline-none
                        focus:ring-blue-500 focus:ring-2"/>
                    </section>

                     {/* Password */}
                    <section className="w-full flex flex-col justify-center items-start mb-10">
                        <label htmlFor="password" className="text-white text-base md:text-lg  font-semibold mb-2">Password</label>
                        <input id="password" type="password" minLength={6} value={password} required onChange={(event) => setPassword(event.target.value)}
                        className="h-10 md:h-12 w-full  text-sm md:text-base text-black px-5 bg-slate-200 rounded-lg outline-none
                        focus:ring-blue-600 focus:ring-2"/>
                    </section>

                    {/* Error Message */}
                    {showErrMsg &&
                        <p className="px-2 py-1 bg-red-600/10 border border-red-500 rounded-lg text-xs md:text-sm text-center text-red-500 tracking-wide mb-2">
                        {errorMsg}</p> 
                    }

            
                    {/* Submit Button */}
                    <button type="submit" className="h-12 md:h-14 w-full text-base text-white font-semibold bg-blue-600 rounded-lg flex flex-row justify-center items-center cursor-pointer
                    hover:bg-blue-700 transition-colors duration-300 mb-5">
                    {isLoading ? "Submiting...": "Submit"}
                     {isLoading && <Loader  className="ml-2 h-4 w-4 md:h-5 md:w-5 animate-spin"/> }
                    </button>
                    {/* Try to login */}
                    <p className="text-sm text-center text-white  mb-2">Do you have an account, Please  
                        <Link to="/login" replace>
                        <span className="text-blue-300 underline ml-1 cursor-pointer"> login</span>
                        </Link>
                    </p>

                </form>
            </div>
        </div>
    )
}



export default Register