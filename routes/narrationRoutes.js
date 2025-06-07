import express from 'express';
import {
  startNarration,
  stopNarration,
  getNarrationSummary
} from '../controllers/narrationController.js';

const router = express.Router();

router.post('/start', startNarration);
router.post('/stop', stopNarration);
router.get('/summary', getNarrationSummary);

export default router;
