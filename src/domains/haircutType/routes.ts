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
	} catch (error) {
		res.status(500).json({ error });
	}
});

router.get('/', async (req, res) => {
	try {
		const haircutTypes = await getHaircutTypes();

		res.json(haircutTypes);
	} catch (error) {
		res.status(500).json({ error });
	}
});

router.get('/:title', async (req, res) => {
	try {
		const { title } = req.params;

		const haircutTypeByTitle = await getHaircutTypeByTitle(title);

		res.json(haircutTypeByTitle);
	} catch (error) {
		res.status(400).json({ error });
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params;

		const deletedHaircutType = await deleteHaircutType(id);

		res.status(204).json(deletedHaircutType);
	} catch (error) {
		res.status(400).json({ error });
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
	} catch (error) {
		res.status(400).json({ error });
	}
});

export default router;
