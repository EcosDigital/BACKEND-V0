import {Router} from 'express'
import { authRequiredWithRole } from '../middlewares/validateToken.js'
import { getStatusRequest } from '../controllers/general.js'

const router = Router();

router.get("/getStatus", authRequiredWithRole, getStatusRequest)

export default router
