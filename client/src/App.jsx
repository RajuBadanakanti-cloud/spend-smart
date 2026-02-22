import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./components/Login"
import Register from "./components/Register"
import Dashboard from "./components/Dashboard"
import Transactions from "./components/Transactions"
import ProtectedRoute from "./components/ProtectedRoute" // protect
import './App.css'

const App = () => (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/transactions" element={<ProtectedRoute><Transactions/></ProtectedRoute>}/>
    </Routes>
    </BrowserRouter>
)

export default App
