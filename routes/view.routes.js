import { Router } from "express";
import { homeView, registerView, loginView, adminView, skaterView, loginAdminView  } from "../controllers/view.controller.js";

export const router = Router();

router.get("/", homeView);
router.get("/registro", registerView);
router.get("/login", loginView);
router.get("/admin", adminView);
router.get("/modify",skaterView)
router.get("/verificarAdmin", loginAdminView )


export default router;