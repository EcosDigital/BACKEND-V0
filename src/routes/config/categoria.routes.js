import { Router } from "express";
import { authRequiredWithRole } from "../../middlewares/validateToken.js";
import { validateSchema } from "../../middlewares/validator.middlewares.js";
import { categoriaSchema } from "../../schema/config/categoriaPost.js";

import {
  registerCategoryRequest,
  getCategoryAllRequest,
  getCategoryRequest,
  updateCategoryRequest,
  deleteCategoryRequest,
  getCategoriesByAreaId
} from "../../controllers/config/categoria.js";

const router = Router()

router.post("/createCategory", authRequiredWithRole, validateSchema(categoriaSchema), registerCategoryRequest)

router.get("/getAllCategory", authRequiredWithRole, getCategoryAllRequest)

router.get("/getCategory/:id", authRequiredWithRole, getCategoryRequest)

router.put("/updateCategory/:id", authRequiredWithRole, validateSchema(categoriaSchema), updateCategoryRequest)

router.delete("/deleteCategory/:id", authRequiredWithRole, deleteCategoryRequest)

router.get("/categories/by-area/:id", authRequiredWithRole,  getCategoriesByAreaId )

export default router