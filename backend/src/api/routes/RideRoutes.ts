import { Router } from 'express';
import { confirmRide } from '../controllers/ConfirmRideController';
import { listRidesByCustomer } from '../controllers/listRidesController';

const router = Router();

router.patch('/', confirmRide); // Confirma uma viagem
router.get('/:customer_id', listRidesByCustomer); 

export default router;