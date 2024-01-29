import express from 'express';
import {
	createNewAppointment,
	deleteAppointment,
	getAppointmentByDate,
	getAppointments,
	getAppointmentsByBarberId,
	getAppointmentsByCustomerId,
	getAppointmentsByTypeId,
	getAvailableDates,
	updateAppointment,
	getAppointmentByDateAndBarberId,
} from './controller';

const router = express.Router();

// Get the next 30 available dates
router.get('/getDates', async (req, res) => {
	try {
		const availableDates = await getAvailableDates();

		res.status(200).json(availableDates);
	} catch (error: any) {
		res.status(400).json(error.message);
	}
});

// Get available times by date and barber
router.get('/getTimes/:date/:barber_id', async (req, res) => {
	try {
		const { date, barber_id } = req.params;

		const appointmentsByDateAndBarberId = await getAppointmentByDateAndBarberId(
			date,
			barber_id,
		);
		const bookedTimes = appointmentsByDateAndBarberId.map(
			(appointment) => appointment.time,
		);

		const allTimes = [
			'10:00',
			'10:40',
			'11:20',
			'12:00',
			'12:40',
			'13:20',
			'14:00',
			'14:40',
			'15:20',
			'16:00',
			'16:40',
			'17:20',
			'18:00',
		];

		const availableTimes = allTimes.filter(
			(time) => !bookedTimes.includes(time),
		);

		res.status(200).json(availableTimes);
	} catch (error: any) {
		res.status(400).json(error.message);
	}
});

// Create a new appointment
router.post('/', async (req, res) => {
	try {
		const { date, time, customer_id, barber_id, type_id } = req.body;

		const newAppointment = await createNewAppointment({
			date,
			time,
			customer_id,
			barber_id,
			type_id,
		});

		res.status(201).json(newAppointment);
	} catch (error: any) {
		res.status(400).json(error.message);
	}
});

// Get all appointments (limit 10)
router.get('/', async (req, res) => {
	try {
		const appointments = await getAppointments();

		res.status(200).json(appointments);
	} catch (error: any) {
		res.status(400).json(error.message);
	}
});

// Get appointment by date
router.get('/:date', async (req, res) => {
	try {
		const { date } = req.params;

		const appointmentByDate = await getAppointmentByDate(date);

		res.status(200).json(appointmentByDate);
	} catch (error: any) {
		res.status(400).json(error.message);
	}
});

// Delete appointment by id
router.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params;

		const deletedAppointment = await deleteAppointment(id);

		res.status(204).json(deletedAppointment);
	} catch (error: any) {
		res.status(400).json(error.message);
	}
});

// Update appointment by id
router.put('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const { date, time, customer_id, barber_id, type_id } = req.body;

		const updatedAppointment = await updateAppointment(id, {
			date,
			time,
			customer_id,
			barber_id,
			type_id,
		});

		res.status(200).json(updatedAppointment);
	} catch (error: any) {
		res.status(400).json(error.message);
	}
});

// Get appointments by barber id
router.get('/barber/:barber_id', async (req, res) => {
	try {
		const { barber_id } = req.params;

		const appointmentsByBarberId = await getAppointmentsByBarberId(barber_id);

		res.status(200).json(appointmentsByBarberId);
	} catch (error: any) {
		res.status(400).json(error.message);
	}
});

// Get appointments by customer id
router.get('/customer/:customer_id', async (req, res) => {
	try {
		const { customer_id } = req.params;

		const appointmentsByCustomerId =
			await getAppointmentsByCustomerId(customer_id);

		res.status(200).json(appointmentsByCustomerId);
	} catch (error: any) {
		res.status(400).json(error.message);
	}
});

// Get appointments by type id
router.get('/type/:type_id', async (req, res) => {
	try {
		const { type_id } = req.params;

		const appointmentsByTypeId = await getAppointmentsByTypeId(type_id);

		res.status(200).json(appointmentsByTypeId);
	} catch (error: any) {
		res.status(400).json(error.message);
	}
});

export default router;
