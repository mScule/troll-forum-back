import { Router } from "express"
import { validationResult } from "express-validator"

const router = Router()

router.use((req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })
  } else {
    next()
  }
})

export default router
