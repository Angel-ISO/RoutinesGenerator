import RoutineService from '../../core/services/RoutineService.js';
import { body, param, validationResult } from 'express-validator';

export const createRoutine = [
  body('name').notEmpty().withMessage('Name is required'),
  body('goal').optional().isString(),
  body('level').optional().isIn(['beginner', 'intermediate', 'advanced']),
  body('days').isArray({ min: 1 }).withMessage('Days must be an array with at least one day'),
  body('days.*.day').notEmpty().withMessage('Day name is required'),
  body('days.*.exercises').isArray({ min: 1 }).withMessage('Exercises must be an array with at least one exercise'),
  body('days.*.exercises.*').isMongoId().withMessage('Each exercise must be a valid ObjectId'),
  body('days.*.notes').optional().isString(),
  body('meta.createdBy').optional().isString(),
  body('meta.durationWeeks').optional().isInt({ min: 1 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const routine = await RoutineService.createRoutine(req.body);
      res.status(201).json(routine);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
];


export const getRoutine = [
  param('id').isMongoId().withMessage('Invalid routine ID'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const routine = await RoutineService.getRoutineById(req.params.id);
      res.json(routine);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
];


export const generatePdf = [
  param('id').isMongoId().withMessage('Invalid routine ID'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const pdfBuffer = await RoutineService.generateRoutinePdf(req.params.id);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="routine.pdf"');
      res.send(pdfBuffer);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
];