import {Router} from "express"
import { validateSchema } from '../middlewares/validator.middlewares.js'
import { emailSchema } from '../schema/miembros.schema.js'


import {authRequired} from '../middlewares/validateToken.js'
import { getTotalMiembrosRequest, prueba, registerMienbroRequest } from "../controllers/app.js";

//importar controladores

const router = Router();

//rutas de trabajo

router.post("/registerMienbro", validateSchema(emailSchema), registerMienbroRequest)

router.get("/getTotalMiembros", getTotalMiembrosRequest)

router.get("/testProfile", authRequired, prueba)

export default router