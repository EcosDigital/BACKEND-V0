import { Router } from 'express'

import { uploadImageRequest } from '../../controllers/admin/utils.js'
import { authRequired } from '../../middlewares/validateToken.js'

const router = Router();

router.post("/uploadImage",  uploadImageRequest )

export default router