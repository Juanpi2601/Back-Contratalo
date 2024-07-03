import express from 'express';
import {createWork , getWorks } from "../controllers/work.controllers.js";

const router = express.Router();

router.post('/create', createWork);
router.get('/getall', getWorks);

export default router;