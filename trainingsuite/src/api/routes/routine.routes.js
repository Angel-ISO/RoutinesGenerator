import express from 'express';
import { createRoutine, getRoutine, generatePdf } from '../controllers/routine.controller.js';

const router = express.Router();

/**
 * @swagger
 * /api/routines:
 *   post:
 *     summary: Create a new routine
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Routine'
 *     responses:
 *       201:
 *         description: Routine created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Routine'
 */
router.post('/', createRoutine);

/**
 * @swagger
 * /api/routines/{id}:
 *   get:
 *     summary: Get routine by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Routine data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Routine'
 */
router.get('/:id', getRoutine);

/**
 * @swagger
 * /api/routines/{id}/pdf:
 *   post:
 *     summary: Generate PDF for routine
 *     description: Downloads a PDF file containing the routine details.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: PDF file
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 */
router.post('/:id/pdf', generatePdf);

export default router;