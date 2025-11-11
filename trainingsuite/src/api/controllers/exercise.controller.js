import ExerciseService from '../../core/services/ExerciseService.js';
import { body, validationResult } from 'express-validator';


export const importExercises = [
  body('limit').optional().isInt({ min: 1, max: 1000 }).withMessage('Limit must be between 1 and 1000'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const limit = req.body.limit || 100;
      const result = await ExerciseService.importExercises(limit);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
];


export const getExercises = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const filter = {};
    if (req.query.target) filter.target = req.query.target;
    if (req.query.equipment) filter.equipment = req.query.equipment;

    const result = await ExerciseService.getExercises(page, limit, filter);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};