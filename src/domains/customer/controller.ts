import customer from '../../db/schema/customer.schema';
import db from '../../db/db';
import { eq } from 'drizzle-orm';

type ICustomer = typeof customer.$inferInsert;

const createNewCustomer = async (data: ICustomer) => {
	try {
		const { firstName, lastName, phone } = data;

		if (!phone || !firstName || !lastName) {
			throw new Error('All the fields are required');
		}

		const existingCustomer = await db
			.select()
			.from(customer)
			.where(eq(customer.phone, phone));

		if (existingCustomer.length > 0) {
			return existingCustomer;
		}

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
		if (!phone) {
			throw new Error('Phone number is required');
		}
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
		if (!id) {
			throw new Error('Id is required');
		}
		const deletedCustomer = await db
			.delete(customer)
			.where(eq(customer.id, id));

		return deletedCustomer;
	} catch (error) {
		throw error;
	}
};

export { getCustomers, createNewCustomer, getCustomerByPhone, deleteCustomer };
