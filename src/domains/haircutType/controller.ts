import haircutType from '../../db/schema/haircutType.schema';
import db from '../../db/db';
import { eq } from 'drizzle-orm';

type IHaircutType = typeof haircutType.$inferInsert;

const createNewHaircutType = async (data: IHaircutType) => {
	try {
		const { title, price, gender } = data;

		if (!title || !price || !gender) {
			throw new Error('Todos os campos são obrigatórios');
		}

		const existingHaircutType = await db
			.select()
			.from(haircutType)
			.where(eq(haircutType.title, title));

		if (existingHaircutType.length > 0) {
			throw new Error('O tipo de corte já existe');
		}

		const newHaircutType = await db
			.insert(haircutType)
			.values({
				...data,
			})
			.returning();

		return newHaircutType;
	} catch (error) {
		throw error;
	}
};

const getHaircutTypes = async () => {
	try {
		const haircutTypes = await db.select().from(haircutType).limit(10);

		return haircutTypes;
	} catch (error) {
		throw error;
	}
};

const getHaircutTypeByTitle = async (title: string) => {
	try {
		if (!title) {
			throw new Error('O título é obrigatório');
		}
		const haircutTypeByTitle = await db
			.select()
			.from(haircutType)
			.where(eq(haircutType.title, title));

		return haircutTypeByTitle;
	} catch (error) {
		throw error;
	}
};

const deleteHaircutType = async (id: string) => {
	try {
		if (!id) {
			throw new Error('O id é obrigatório');
		}

		const deletedHaircutType = await db
			.delete(haircutType)
			.where(eq(haircutType.id, id));

		return deletedHaircutType;
	} catch (error) {
		throw error;
	}
};

const updateHaircutType = async (id: string, data: IHaircutType) => {
	try {
		if (!id) {
			throw new Error('O id é obrigatório');
		}

		const updatedHaircutType = await db
			.update(haircutType)
			.set({
				...data,
			})
			.where(eq(haircutType.id, id))
			.returning();

		return updatedHaircutType;
	} catch (error) {
		throw error;
	}
};

export {
	getHaircutTypes,
	createNewHaircutType,
	getHaircutTypeByTitle,
	deleteHaircutType,
	updateHaircutType,
};
