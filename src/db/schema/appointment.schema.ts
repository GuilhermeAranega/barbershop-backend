import { createId } from '@paralleldrive/cuid2';
import { pgTable, text } from 'drizzle-orm/pg-core';

import customer from './customer.schema';
import barber from './barber.schema';
import haircutType from './haircutType.schema';

export const appointment = pgTable('appointment', {
	id: text('id')
		.$defaultFn(() => createId())
		.primaryKey(),
	date: text('date'),
	time: text('time'),
	customer_id: text('customer_id').references(() => customer.id),
	barber_id: text('barber_id').references(() => barber.id),
	type_id: text('type_id').references(() => haircutType.id),
});

export default appointment;
