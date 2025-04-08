import { Router } from "express"
import auth from "./User"

const router = Router()

router.use("/auth", auth)

export default router
