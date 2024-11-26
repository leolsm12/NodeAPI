import { Router } from 'express';
import { estimateRide } from '../controllers/estimateRideController';

const router = Router();

router.post('/', estimateRide);

export default router;