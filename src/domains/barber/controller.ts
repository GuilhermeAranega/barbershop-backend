import barber from '../../db/schema/barber.schema';
import db from '../../db/db';
import { eq } from 'drizzle-orm';

type IBarber = typeof barber.$inferInsert;

const createNewBarber = async (data: IBarber) => {
	try {
		const { firstName, lastName, phone } = data;

		if (!phone || !firstName || !lastName) {
			throw new Error('All the fields are required');
		}

		const existingBarber = await db
			.select()
			.from(barber)
			.where(eq(barber.phone, phone));

		if (existingBarber.length > 0) {
			return existingBarber;
		}

		const newBarber = await db
			.insert(barber)
			.values({
				...data,
			})
			.returning();

		return newBarber;
	} catch (error) {
		throw error;
	}
};

const getBarbers = async () => {
	try {
		const barbers = await db.select().from(barber).limit(10);

		return barbers;
	} catch (error) {
		throw error;
	}
};

const getBarberByName = async (firstName: string) => {
	try {
		if (!firstName) {
			throw new Error('First name is required');
		}
		const barbersByName = await db
			.select()
			.from(barber)
			.where(eq(barber.firstName, firstName));

		return barbersByName;
	} catch (error) {
		throw error;
	}
};

const deleteBarber = async (id: string) => {
	try {
		if (!id) {
			throw new Error('ID is required');
		}

		const deletedBarber = await db.delete(barber).where(eq(barber.id, id));

		return deletedBarber;
	} catch (error) {
		throw error;
	}
};

const updateBarber = async (id: string, data: IBarber) => {
	try {
		if (!id) {
			throw new Error('ID is required');
		}

		const updatedBarber = await db
			.update(barber)
			.set({
				...data,
			})
			.where(eq(barber.id, id))
			.returning();

		return updatedBarber;
	} catch (error) {
		throw error;
	}
};

export {
	createNewBarber,
	getBarbers,
	getBarberByName,
	deleteBarber,
	updateBarber,
};
