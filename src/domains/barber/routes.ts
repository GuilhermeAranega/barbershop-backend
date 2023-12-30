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
	const { firstName, lastName, phone } = req.body;

	const newBarber = await createNewBarber({
		firstName,
		lastName,
		phone,
	});

	res.status(201).json(newBarber);
});

// Get all barbers (limit 10)
router.get('/', async (req, res) => {
	const barbers = await getBarbers();

	res.status(200).json(barbers);
});

// Get barber by first name
router.get('/:firstName', async (req, res) => {
	const { firstName } = req.params;

	const barberByName = await getBarberByName(firstName);

	res.status(200).json(barberByName);
});

// Delete barber by id
router.delete('/:id', async (req, res) => {
	const { id } = req.params;

	const deletedBarber = await deleteBarber(id);

	res.status(200).json(deletedBarber);
});

// Update barber by id
router.put('/:id', async (req, res) => {
	const { id } = req.params;
	const { firstName, lastName, phone } = req.body;

	const updatedBarber = await updateBarber(id, {
		firstName,
		lastName,
		phone,
	});

	res.status(200).json(updatedBarber);
});
export default router;
