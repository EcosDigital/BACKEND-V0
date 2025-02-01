import { Router } from "express";
import { validateSchema } from "../../middlewares/validator.middlewares.js";
import {
  registerPostSchema,
  updatePostSchema,
} from "../../schema/admin/post.js";

import { authRequiredWithRole } from "../../middlewares/validateToken.js";

import {
  deletePostRequest,
  getPostBySlugRequest,
  getPostDestacadosRequest,
  getPostRecentsRequest,
  getPostRequest,
  registerPostRequest,
  updateJsonRequest,
  updatePostRequest,
} from "../../controllers/admin/post.js";

const router = Router();

router.post(
  "/createNewPost",
  authRequiredWithRole,
  validateSchema(registerPostSchema),
  registerPostRequest
);

router.get("/getPostRecents", authRequiredWithRole, getPostRecentsRequest);

router.get("/getPost/:id", authRequiredWithRole, getPostRequest);

router.put(
  "/updatePost/:id",
  authRequiredWithRole,
  validateSchema(updatePostSchema),
  updatePostRequest
);

router.delete("/deletePost/:id", authRequiredWithRole, deletePostRequest);

router.put("/updateJsonPost/:id", authRequiredWithRole, updateJsonRequest)

router.get("/getPostDestacados", getPostDestacadosRequest)

router.get("/getArticleBySlug/:slug", getPostBySlugRequest)

export default router;