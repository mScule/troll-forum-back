import { Router } from "express"
import notFound from "../../express/not-found"
const router = Router()

router.use((_req, res) => notFound(res))

export default router
