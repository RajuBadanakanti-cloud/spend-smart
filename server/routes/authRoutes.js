import express from "express"
import { login, register } from "../controllers/authController.js"

const routes = express.Router()

routes.route("/register").post(register)
routes.route("/login").post(login)


export default routes