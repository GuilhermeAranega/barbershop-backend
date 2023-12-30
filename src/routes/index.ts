import express from 'express';

const router = express.Router();

import customerRoutes from '../domains/customer/routes';

router.use('/customer', customerRoutes);

router.get('/', (req, res) => {
	res.send('Server running');
});

export default router;
