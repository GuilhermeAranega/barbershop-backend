import express from 'express';
import {
	createNewCustomer,
	getCustomers,
	getCustomerByPhone,
	deleteCustomer,
	getCustomerById,
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
	} catch (error: any) {
		res.status(400).json(error.message);
	}
});

// Get customer by id
router.get('/:id', async (req, res) => {
	try {
		const { id } = req.params;

		const customer = await getCustomerById(id);

		res.status(200).json(customer);
	} catch (error: any) {
		res.status(400).json(error.message);
	}
});

router.get('/', async (req, res) => {
	try {
		const customers = await getCustomers();

		res.status(200).json(customers);
	} catch (error: any) {
		res.status(400).json(error.message);
	}
});

router.get('/:phone', async (req, res) => {
	try {
		const { phone } = req.params;

		const customer = await getCustomerByPhone(phone);

		res.status(200).json(customer);
	} catch (error: any) {
		res.status(400).json(error.message);
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params;

		const deletedCustomer = await deleteCustomer(id);

		res.status(204).json(deletedCustomer);
	} catch (error: any) {
		res.status(400).json(error.message);
	}
});

export default router;
