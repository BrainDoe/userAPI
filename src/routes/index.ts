import express from "express"
import userRoutes from './user.routes'
import authRoutes from './auth.route';

const router = express.Router();

router.get('/healthcheck', (_, res) => res.sendStatus(200));
router.use(authRoutes);
router.use(userRoutes);

export default router;