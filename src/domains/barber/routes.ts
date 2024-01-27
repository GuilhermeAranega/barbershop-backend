import express from 'express';
import {
	createNewBarber,
	getBarbers,
	getBarberByName,
	deleteBarber,
	updateBarber,
} from './controller';

const router = express.Router();

// Create a new barber
router.post('/', async (req, res) => {
	try {
		const { firstName, lastName, phone } = req.body;
		const newBarber = await createNewBarber({
			firstName,
			lastName,
			phone,
		});

		res.status(201).json(newBarber);
	} catch (error: any) {
		res.status(400).json(error.message);
	}
});

// Get all barbers (limit 10)
router.get('/', async (req, res) => {
	try {
		const barbers = await getBarbers();

		res.status(200).json(barbers);
	} catch (error: any) {
		res.status(400).json(error.message);
	}
});

// Get barber by first name
router.get('/:firstName', async (req, res) => {
	try {
		const { firstName } = req.params;

		const barberByName = await getBarberByName(firstName);

		res.status(200).json(barberByName);
	} catch (error: any) {
		res.status(400).json(error.message);
	}
});

// Delete barber by id
router.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params;

		const deletedBarber = await deleteBarber(id);

		res.status(200).json(deletedBarber);
	} catch (error: any) {
		res.status(400).json(error.message);
	}
});

// Update barber by id
router.put('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const { firstName, lastName, phone } = req.body;

		const updatedBarber = await updateBarber(id, {
			firstName,
			lastName,
			phone,
		});

		res.status(200).json(updatedBarber);
	} catch (error: any) {
		res.status(400).json(error.message);
	}
});

export default router;
