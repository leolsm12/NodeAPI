import express, { Request, Response, Router } from 'express';

import { getRouteDataController } from '../controllers/RouteDataController';

const router = Router();

router.post('/route', getRouteDataController);

export default router;