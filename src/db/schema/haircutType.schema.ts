import { createId } from '@paralleldrive/cuid2';
import { pgTable, varchar, text, real, pgEnum } from 'drizzle-orm/pg-core';

export const genderEnum = pgEnum('gender', ['masculino', 'feminino']);

export const haircutType = pgTable('haircutType', {
	id: text('id')
		.$defaultFn(() => createId())
		.primaryKey(),
	title: varchar('title', { length: 50 }),
	price: real('price'),
	gender: genderEnum('gender'),
});

export default haircutType;
