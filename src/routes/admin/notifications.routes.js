import { Router } from 'express'
import { validateSchema } from '../../middlewares/validator.middlewares.js'
import { htmlEmailSchema } from '../../schema/admin/notifications.js'

import { authRequiredWithRole } from '../../middlewares/validateToken.js'

import { sendNotificationRequest } from '../../controllers/admin/notification.js'

const router = Router();

router.post("/sendNotification", authRequiredWithRole, validateSchema(htmlEmailSchema), sendNotificationRequest)

export default router