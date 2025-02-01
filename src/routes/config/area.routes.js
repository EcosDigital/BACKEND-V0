import { Router } from "express";
import { authRequiredWithRole } from "../../middlewares/validateToken.js";
import { validateSchema } from "../../middlewares/validator.middlewares.js";
import { validateSchemaNewArea } from "../../schema/config/areapost.js";

import {
  registerAreaPostRequest,
  getAreaPostRecentRequest,
  getAreaPostRequest,
  updateAreaPostRequest,
  deleteAreaPostRequest,
} from "../../controllers/config/area.js";

const router = Router();

router.post(
  "/createAreaPost",
  authRequiredWithRole,
  validateSchema(validateSchemaNewArea),
  registerAreaPostRequest
);

router.get(
  "/getAreaPostRecent",
  authRequiredWithRole,
  getAreaPostRecentRequest
);

router.get("/getAreaPost/:id", authRequiredWithRole, getAreaPostRequest);

router.put(
  "/updateAreaPost/:id",
  authRequiredWithRole,
  validateSchema(validateSchemaNewArea),
  updateAreaPostRequest
);

router.delete("/deleteAreaPost/:id", authRequiredWithRole, deleteAreaPostRequest)

export default router;
