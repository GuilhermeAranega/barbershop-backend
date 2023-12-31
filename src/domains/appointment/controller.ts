import appointment from '../../db/schema/appointment.schema';
import customer from '../../db/schema/customer.schema';
import barber from '../../db/schema/barber.schema';
import haircutType from '../../db/schema/haircutType.schema';

import db from '../../db/db';
import { eq, or } from 'drizzle-orm';

type IAppointment = typeof appointment.$inferInsert;

// Create a new appointment
// ! Erro: multiplas queries na mesma função, overloaded
const createNewAppointment = async (data: IAppointment) => {
	try {
		const { date, time, customer_id, barber_id, type_id } = data;

		if (!date || !time || !customer_id || !barber_id || !type_id) {
			throw new Error('All the fields are required');
		}

		const existingAppointment = await db
			.select()
			.from(appointment)
			.where(or(eq(appointment.date, date), eq(appointment.time, time)));

		if (existingAppointment.length > 0) {
			throw new Error('Appointment already exists');
		}

		const newAppointment = await db
			.insert(appointment)
			.values({
				date,
				time,
				barber_id,
				customer_id,
				type_id,
			})
			.returning();

		return newAppointment;
	} catch (error) {
		throw error;
	}
};

// Get all appointments (limit 10)
const getAppointments = async () => {
	try {
		const appointments = await db.select().from(appointment).limit(10);

		return appointments;
	} catch (error) {
		throw error;
	}
};

// Get appointments by date
const getAppointmentByDate = async (date: string) => {
	try {
		if (!date) {
			throw new Error('Date is required');
		}
		const appointmentByDate = await db
			.select()
			.from(appointment)
			.where(eq(appointment.date, date));

		return appointmentByDate;
	} catch (error) {
		throw error;
	}
};

// Delete an appointment
const deleteAppointment = async (id: string) => {
	try {
		const deletedAppointment = await db
			.delete(appointment)
			.where(eq(appointment.id, id));

		return deletedAppointment;
	} catch (error) {
		throw error;
	}
};

// Update an appointment
const updateAppointment = async (id: string, data: IAppointment) => {
	try {
		if (!id) {
			throw new Error('Id is required');
		}

		const updatedAppointment = await db
			.update(appointment)
			.set({
				...data,
			})
			.where(eq(appointment.id, id));

		return updatedAppointment;
	} catch (error) {
		throw error;
	}
};

// Get appointments by barber id
const getAppointmentsByBarberId = async (barber_id: string) => {
	try {
		if (!barber_id) {
			throw new Error('Barber id is required');
		}
		const appointmentsByBarberId = await db
			.select()
			.from(appointment)
			.where(eq(appointment.barber_id, barber_id));

		return appointmentsByBarberId;
	} catch (error) {
		throw error;
	}
};

// Get appointments by customer id
const getAppointmentsByCustomerId = async (customer_id: string) => {
	try {
		if (!customer_id) {
			throw new Error('Customer id is required');
		}
		const appointmentsByCustomerId = await db
			.select()
			.from(appointment)
			.where(eq(appointment.customer_id, customer_id));

		return appointmentsByCustomerId;
	} catch (error) {
		throw error;
	}
};

// Get appointments by type id
const getAppointmentsByTypeId = async (type_id: string) => {
	try {
		if (!type_id) {
			throw new Error('Type id is required');
		}
		const appointmentsByTypeId = await db
			.select()
			.from(appointment)
			.where(eq(appointment.type_id, type_id));

		return appointmentsByTypeId;
	} catch (error) {
		throw error;
	}
};

export {
	createNewAppointment,
	getAppointments,
	getAppointmentByDate,
	deleteAppointment,
	updateAppointment,
	getAppointmentsByBarberId,
	getAppointmentsByCustomerId,
	getAppointmentsByTypeId,
};
