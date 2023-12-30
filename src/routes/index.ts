import express from 'express';

const router = express.Router();

import customerRoutes from '../domains/customer/routes';
import barberRoutes from '../domains/barber/routes';

router.use('/customer', customerRoutes);
router.use('/barber', barberRoutes);

router.get('/', (req, res) => {
	res.send('Server running');
});

export default router;
