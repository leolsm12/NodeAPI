import { Router } from 'express';
import { estimateRide } from '../controllers/rideController';

const router = Router();

router.post('/', estimateRide);

export default router;