import customer from './model';
import db from '../../db/db';
import { eq } from 'drizzle-orm';

type NewCustomer = typeof customer.$inferInsert;

const createNewCustomer = async (data: NewCustomer) => {
	try {
		const { firstName, lastName, phone } = data;

		const newCustomer = await db
			.insert(customer)
			.values({
				firstName,
				lastName,
				phone,
			})
			.returning();

		return newCustomer;
	} catch (error) {
		throw error;
	}
};

const getCustomers = async () => {
	try {
		const customers = await db.select().from(customer).limit(10);

		return customers;
	} catch (error) {
		throw error;
	}
};

const getCustomerByPhone = async (phone: string) => {
	try {
		const customerByPhone = await db
			.select()
			.from(customer)
			.where(eq(customer.phone, phone));

		return customerByPhone;
	} catch (error) {
		throw error;
	}
};

const deleteCustomer = async (id: string) => {
	try {
		const deletedCustomer = await db
			.delete(customer)
			.where(eq(customer.id, id));

		return deletedCustomer;
	} catch (error) {
		throw error;
	}
};

export { getCustomers, createNewCustomer, getCustomerByPhone, deleteCustomer };
