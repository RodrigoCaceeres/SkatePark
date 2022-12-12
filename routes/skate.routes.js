import { Router } from "express";
import { getSkaters, addSkaters, setSkaterStatus, skaterVerify, skaterModify, skaterDelete, adminVerify  } from "../controllers/skaters.controller.js";

const router = Router();

router.get("/skaters", getSkaters);
router.post("/skaters", addSkaters);
router.post("/verificar", skaterVerify);
router.post("/verificarAdmin",  adminVerify);
router.put("/skaters", setSkaterStatus);
router.put("/modify", skaterModify);
router.delete("/skaters/:email", skaterDelete)

export default router;

