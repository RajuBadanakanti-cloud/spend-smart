import express from "express"
import { addTransaction, deleteTransaction, editTransaction, getAllTransactions } from "../controllers/transactionController.js"
import {protect} from "../middlewares/protect.js"
 
const routes = express.Router()

routes.route("/").get(protect, getAllTransactions)
routes.route("/").post(protect, addTransaction)
routes.route("/:id").put(protect, editTransaction)
routes.route("/:id").delete(protect, deleteTransaction)

export default routes 
