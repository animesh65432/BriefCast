import config from "./config"
import { errorMiddleware, rateLimiter } from "./middleware"
import router from "./router"
import cors from "cors"
import express from "express"

const app = express()
app.use(cors({ origin: "*" }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use("/api", rateLimiter(10, 2 * 60 * 1000))
app.use("/api", router)
app.use(errorMiddleware)
app.listen(config.PORT, () => console.log(`Server start at http://localhost:${config.PORT}`))