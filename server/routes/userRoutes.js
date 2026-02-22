import express from "express"
import { deleteUserById, getAllUsers } from "../controllers/userController.js"

const routes = express.Router()

routes.route("/").get(getAllUsers)
routes.route("/:id").delete(deleteUserById)

export default routes 