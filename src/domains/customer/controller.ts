import customer from '../../db/schema/customer.schema';
import db from '../../db/db';
import { eq } from 'drizzle-orm';

type ICustomer = typeof customer.$inferInsert;

// Create a new customer
const createNewCustomer = async (data: ICustomer) => {
	try {
		const { firstName, lastName, phone } = data;

		if (!phone || !firstName || !lastName) {
			throw new Error('Todos os campos são obrigatórios');
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

// Get all customers (limit 10)
const getCustomers = async () => {
	try {
		const customers = await db.select().from(customer).limit(10);

		return customers;
	} catch (error) {
		throw error;
	}
};

// Get customer by phone
const getCustomerByPhone = async (phone: string) => {
	try {
		if (!phone) {
			throw new Error('O número de telefone é obrigatório');
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

// Get customer by id
const getCustomerById = async (id: string) => {
	try {
		if (!id) {
			throw new Error('O id é obrigatório');
		}
		const customerById = await db
			.select()
			.from(customer)
			.where(eq(customer.id, id));

		return customerById;
	} catch (error) {
		throw error;
	}
};

// Delete customer by id
const deleteCustomer = async (id: string) => {
	try {
		if (!id) {
			throw new Error('O id é obrigatório');
		}
		const deletedCustomer = await db
			.delete(customer)
			.where(eq(customer.id, id));

		return deletedCustomer;
	} catch (error) {
		throw error;
	}
};

const updateCustomer = async (id: string, data: ICustomer) => {
	try {
		if (!id) {
			throw new Error('O id é obrigatório');
		}
		const { firstName, lastName, phone } = data;

		const updatedCustomer = await db
			.update(customer)
			.set({
				firstName,
				lastName,
				phone,
			})
			.where(eq(customer.id, id));

		return updatedCustomer;
	} catch (error) {
		throw error;
	}
};

export {
	getCustomers,
	createNewCustomer,
	getCustomerByPhone,
	deleteCustomer,
	getCustomerById,
	updateCustomer,
};
