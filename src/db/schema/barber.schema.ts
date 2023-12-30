import { createId } from '@paralleldrive/cuid2';
import { pgTable, varchar, text } from 'drizzle-orm/pg-core';

export const barber = pgTable('barber', {
	id: text('id')
		.$defaultFn(() => createId())
		.primaryKey(),
	firstName: varchar('first_name', { length: 50 }),
	lastName: varchar('last_name', { length: 50 }),
	phone: varchar('phone', { length: 50 }),
});

export default barber;
