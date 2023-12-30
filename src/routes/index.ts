import express from 'express';

const router = express.Router();

import customerRoutes from '../domains/customer/routes';
import barberRoutes from '../domains/barber/routes';
import haircutTypeRoutes from '../domains/haircutType/routes';
import appointmentRoutes from '../domains/appointment/routes';

router.use('/customer', customerRoutes);
router.use('/barber', barberRoutes);
router.use('/haircutType', haircutTypeRoutes);
router.use('/appointment', appointmentRoutes);

router.get('/', (req, res) => {
	res.send('Server running');
});

export default router;
