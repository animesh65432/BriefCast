import { Router } from "express"
import controllers from "../../controllers"

const { signup, login } = controllers.auth

const auth = Router()

auth.post("/signup", signup)
auth.post("/login", login)



export default auth


