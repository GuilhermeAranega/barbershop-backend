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
} from './controller';

const router = express.Router();

// Get the next 30 available dates
router.get('/getDates', async (req, res) => {
	try {
		const availableDates = await getAvailableDates();

		res.status(200).json(availableDates);
	} catch (error) {
		res.status(400).json({ error });
	}
});

// Get the next time slots available for a specific date
router.get('/getTimes/:date', async (req, res) => {
	try {
		const { date } = req.params;

		const appointmentsByDate = await getAppointmentByDate(date);
		const bookedTimes = appointmentsByDate.map(
			(appointment) => appointment.time,
		);

		const availableTimes = [
			'10h00',
			'10h40',
			'11h20',
			'12h00',
			'12h40',
			'13h20',
			'14h00',
			'14h40',
			'15h20',
			'16h00',
			'16h40',
			'17h20',
			'18h00',
		].filter((time) => !bookedTimes.includes(time));

		res.status(200).json(availableTimes);
	} catch (error) {
		res.status(400).json({ error });
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
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
});

// Get all appointments (limit 10)
router.get('/', async (req, res) => {
	try {
		const appointments = await getAppointments();

		res.status(200).json(appointments);
	} catch (error) {
		res.status(500).json({ error });
	}
});

// Get appointment by date
router.get('/:date', async (req, res) => {
	try {
		const { date } = req.params;

		const appointmentByDate = await getAppointmentByDate(date);

		res.status(200).json(appointmentByDate);
	} catch (error) {
		res.status(400).json({ error });
	}
});

// Delete appointment by id
router.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params;

		const deletedAppointment = await deleteAppointment(id);

		res.status(204).json(deletedAppointment);
	} catch (error) {
		res.status(400).json({ error });
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
	} catch (error) {
		res.status(400).json({ error });
	}
});

// Get appointments by barber id
router.get('/barber/:barber_id', async (req, res) => {
	try {
		const { barber_id } = req.params;

		const appointmentsByBarberId = await getAppointmentsByBarberId(barber_id);

		res.status(200).json(appointmentsByBarberId);
	} catch (error) {
		res.status(400).json({ error });
	}
});

// Get appointments by customer id
router.get('/customer/:customer_id', async (req, res) => {
	try {
		const { customer_id } = req.params;

		const appointmentsByCustomerId =
			await getAppointmentsByCustomerId(customer_id);

		res.status(200).json(appointmentsByCustomerId);
	} catch (error) {
		res.status(400).json({ error });
	}
});

// Get appointments by type id
router.get('/type/:type_id', async (req, res) => {
	try {
		const { type_id } = req.params;

		const appointmentsByTypeId = await getAppointmentsByTypeId(type_id);

		res.status(200).json(appointmentsByTypeId);
	} catch (error) {
		res.status(400).json({ error });
	}
});

export default router;
