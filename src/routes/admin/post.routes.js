import {Router} from "express"
import { validateSchema } from '../../middlewares/validator.middlewares.js'
import { registerPostSchema } from '../../schema/admin/post.js'

import { authRequiredWithRole } from '../../middlewares/validateToken.js'

import { registerPostRequest } from '../../controllers/admin/post.js'

const router = Router();

router.post("/createNewPost", authRequiredWithRole, validateSchema(registerPostSchema), registerPostRequest)

export default router