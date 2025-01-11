import {Router} from "express"
import { validateSchema } from '../middlewares/validator.middlewares.js'
import { emailSchema } from '../schema/miembros.schema.js'
import { registerMienbroRequest } from "../controllers/app.js";

//importar controladores

const router = Router();

//rutas de trabajo

router.post("/registerMienbro", validateSchema(emailSchema), registerMienbroRequest)

//router.get("/getTotalMienbros")

export default router