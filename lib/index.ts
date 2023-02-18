import "./setup/env"

import express from "express"
import cors from "cors"
import jsonContentType from "./middleware/json-content-type"
import v1 from "./api/v1"
import notFound from "./api/not-found"

// Server
const app = express()
const { SERVER_HOST, SERVER_PORT, DB_HOST, DB_PORT } = process.env

// Middleware
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(jsonContentType)

// Routes
app.use("/v1", v1.router)
app.all("*", notFound)

// Start
app.listen(SERVER_PORT, () => {
  console.log(
    `Server:   ${SERVER_HOST} port ${SERVER_PORT}\n` +
    `Database: ${DB_HOST} port ${DB_PORT}`
  )
})
