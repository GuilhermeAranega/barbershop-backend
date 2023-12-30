import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import 'dotenv/config';
import postgres from 'postgres';

const client = postgres(process.env.DATABASE_URL!, { ssl: 'require' });
const db: PostgresJsDatabase = drizzle(client);

const doMigration = async () => {
	await migrate(db, { migrationsFolder: 'drizzle' });
};

doMigration();

export default db;
