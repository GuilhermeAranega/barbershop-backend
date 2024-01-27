import express from 'express';
import {
	createNewHaircutType,
	deleteHaircutType,
	getHaircutTypeByTitle,
	getHaircutTypes,
	updateHaircutType,
} from './controller';

const router = express.Router();

router.post('/', async (req, res) => {
	try {
		const { title, price, gender } = req.body;
		const newHaircutType = await createNewHaircutType({
			title,
			price,
			gender,
		});

		res.status(201).json(newHaircutType);
	} catch (error: any) {
		res.status(400).json(error.message);
	}
});

router.get('/', async (req, res) => {
	try {
		const haircutTypes = await getHaircutTypes();

		res.json(haircutTypes);
	} catch (error: any) {
		res.status(400).json(error.message);
	}
});

router.get('/:title', async (req, res) => {
	try {
		const { title } = req.params;

		const haircutTypeByTitle = await getHaircutTypeByTitle(title);

		res.json(haircutTypeByTitle);
	} catch (error: any) {
		res.status(400).json(error.message);
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params;

		const deletedHaircutType = await deleteHaircutType(id);

		res.status(204).json(deletedHaircutType);
	} catch (error: any) {
		res.status(400).json(error.message);
	}
});

router.put('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const { title, price, gender } = req.body;

		const updatedHaircutType = await updateHaircutType(id, {
			title,
			price,
			gender,
		});

		res.status(204).json(updatedHaircutType);
	} catch (error: any) {
		res.status(400).json(error.message);
	}
});

export default router;
