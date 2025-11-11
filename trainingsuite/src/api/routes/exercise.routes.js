import express from 'express';
import { importExercises, getExercises } from '../controllers/exercise.controller.js';

const router = express.Router();

/**
 * @swagger
 * /api/exercises/import:
 *   post:
 *     summary: Import exercises from ExerciseDB API
 *     description: Fetches exercises from ExerciseDB and stores them in the database, deduplicating by name. ExerciseDB API docs: https://exercisedb-api.vercel.app/docs
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               limit:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 1000
 *                 default: 100
 *     responses:
 *       200:
 *         description: Import result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 imported:
 *                   type: integer
 *                 total:
 *                   type: integer
 */
router.post('/import', importExercises);

/**
 * @swagger
 * /api/exercises:
 *   get:
 *     summary: Get paginated list of exercises
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: target
 *         schema:
 *           type: string
 *       - in: query
 *         name: equipment
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of exercises
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 exercises:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Exercise'
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 */
router.get('/', getExercises);

export default router;