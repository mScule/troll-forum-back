import "./setup/env"
import express from "express"
import cors from "cors"
import jsonContentType from "./middleware/json-content-type"
import apiV1 from "./router/v1"
import notFound from "./router/not-found"

// Server
const app = express()
const { SERVER_HOST, SERVER_PORT, DB_HOST, DB_PORT } = process.env

// Middleware
app.use(cors())
app.use(express.json())
app.use(jsonContentType)

// Routes
app.use("/v1", apiV1)
app.all("*", notFound)

// Start
app.listen(SERVER_PORT, () => {
  console.log(
    `Server:   ${SERVER_HOST} port ${SERVER_PORT}\n` +
    `Database: ${DB_HOST} port ${DB_PORT}`
  )
})
