import {Router} from 'express'
import { validateSchema } from '../middlewares/validator.middlewares.js'
import { singninSchemaNative, validateSchemaUserNative } from '../schema/auth.schema.js'

import { createNewUsuarioRequest, logoutUserNative, signinNativeRequest, verifyTokenNativeRequest } from '../controllers/auth.js'

const router = Router();

//rutas para la seccion AUTH de los usuarios
router.post("/createNewUsuario", validateSchema(validateSchemaUserNative), createNewUsuarioRequest)

router.post("/signinNative", validateSchema(singninSchemaNative), signinNativeRequest)

router.get("/verifyTokenNative", verifyTokenNativeRequest)

router.post("/logout", logoutUserNative)

export default router