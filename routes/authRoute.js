import express from "express";

import jsonwebtoken from "jsonwebtoken"
import auth from "../middleware/auth.js";


const router = express.Router();

router.post("/login", auth)

module.exports = router;

