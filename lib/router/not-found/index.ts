import { Router } from "express"
const router = Router()

router.use((_req, res) => {
  res.status(404)
  res.send(`${res.statusCode} Not found`)
})

export default router
