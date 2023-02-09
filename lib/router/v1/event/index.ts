import { Router } from "express"

const router = Router()

router.route("/").get((req, res) => res.send("Event"))

export default router
