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
		console.log(req.body);
		const newBarber = await createNewBarber({
			firstName,
			lastName,
			phone,
		});

		res.status(201).json(newBarber);
	} catch (error) {
		res.status(500).json({ error });
	}
});

// Get all barbers (limit 10)
router.get('/', async (req, res) => {
	try {
		const barbers = await getBarbers();

		res.status(200).json(barbers);
	} catch (error) {
		res.status(500).json({ error });
	}
});

// Get barber by first name
router.get('/:firstName', async (req, res) => {
	try {
		const { firstName } = req.params;

		const barberByName = await getBarberByName(firstName);

		res.status(200).json(barberByName);
	} catch (error) {
		res.status(400).json({ error });
	}
});

// Delete barber by id
router.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params;

		const deletedBarber = await deleteBarber(id);

		res.status(200).json(deletedBarber);
	} catch (error) {
		res.status(400).json({ error });
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
	} catch (error) {
		res.status(400).json({ error });
	}
});

export default router;
