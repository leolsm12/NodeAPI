import express, { Request, Response, Router } from 'express';

import { getRouteDataController } from '../controllers/RouteDataController';

const router = Router();

router.get('/route', getRouteDataController);

export default router;