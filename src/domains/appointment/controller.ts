import appointment from '../../db/schema/appointment.schema';

import db from '../../db/db';
import { eq, and } from 'drizzle-orm';

type IAppointment = typeof appointment.$inferInsert;

// Create a new appointment
const createNewAppointment = async (data: IAppointment) => {
	try {
		const { date, time, customer_id, barber_id, type_id } = data;

		if (!date || !time || !customer_id || !barber_id || !type_id) {
			throw new Error('All the fields are required');
		}

		const existingAppointment = await db
			.select()
			.from(appointment)
			.where(and(eq(appointment.date, date), eq(appointment.time, time)));

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

declare global {
	interface Date {
		addDays(days: number): Date;
	}
}

// Get the next 30 available dates
const getAvailableDates = async () => {
	try {
		Date.prototype.addDays = function (days) {
			const date = new Date(this.valueOf());
			date.setDate(date.getDate() + days);
			return date;
		};

		function formatDate(date: Date): string {
			const year = date.getFullYear();
			const month = String(date.getMonth() + 1).padStart(2, '0');
			const day = String(date.getDate()).padStart(2, '0');
			return `${year}-${month}-${day}`;
		}

		function getDates(startDate: Date, stopDate: Date) {
			const dateArray: string[] = [];
			let currentDate = startDate;
			while (currentDate <= stopDate) {
				if (currentDate.getDay() !== 0) {
					dateArray.push(formatDate(currentDate));
				}
				currentDate = currentDate.addDays(1);
			}
			return dateArray;
		}

		const dates = getDates(new Date(), new Date().addDays(30));

		return dates;
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
	getAvailableDates,
};
