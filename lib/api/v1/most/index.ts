import { Router } from "express"
import handler from "./handler"

const router = Router()
const path = "/most"

router.route(`${path}/dull`).get((req, res) => handler.get(req, res, "DULL"))
router.route(`${path}/spam`).get((req, res) => handler.get(req, res, "SPAM"))
router.route(`${path}/troll`).get((req, res) => handler.get(req, res, "TROLL"))

export default {
  path,
  router
}
