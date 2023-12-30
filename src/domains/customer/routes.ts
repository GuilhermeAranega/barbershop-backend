import express from 'express';
import {
	createNewCustomer,
	getCustomers,
	getCustomerByPhone,
	deleteCustomer,
} from './controller';
const router = express.Router();

router.post('/', async (req, res) => {
	const { firstName, lastName, phone } = req.body;

	const newCustomer = await createNewCustomer({
		firstName,
		lastName,
		phone,
	});

	res.status(201).json(newCustomer);
});

router.get('/', async (req, res) => {
	const customers = await getCustomers();

	res.status(200).json(customers);
});

router.get('/:phone', async (req, res) => {
	const { phone } = req.params;

	const customer = await getCustomerByPhone(phone);

	res.status(200).json(customer);
});

router.delete('/:id', async (req, res) => {
	const { id } = req.params;

	const deletedCustomer = await deleteCustomer(id);

	res.status(204).json(deletedCustomer);
});

export default router;
