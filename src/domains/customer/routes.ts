import express from 'express';
import {
	createNewCustomer,
	getCustomers,
	getCustomerByPhone,
	deleteCustomer,
} from './controller';
const router = express.Router();

router.post('/', async (req, res) => {
	try {
		const { firstName, lastName, phone } = req.body;

		const newCustomer = await createNewCustomer({
			firstName,
			lastName,
			phone,
		});

		res.status(201).json(newCustomer);
	} catch (error) {
		res.status(500).json({ error });
	}
});

router.get('/', async (req, res) => {
	try {
		const customers = await getCustomers();

		res.status(200).json(customers);
	} catch (error) {
		res.status(500).json({ error });
	}
});

router.get('/:phone', async (req, res) => {
	try {
		const { phone } = req.params;

		const customer = await getCustomerByPhone(phone);

		res.status(200).json(customer);
	} catch (error) {
		res.status(400).json({ error });
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params;

		const deletedCustomer = await deleteCustomer(id);

		res.status(204).json(deletedCustomer);
	} catch (error) {
		res.status(400).json({ error });
	}
});

export default router;
