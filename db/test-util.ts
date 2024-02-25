import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { unlink } from "fs/promises";


export async function setupTestDB(dbPath: string) {
    const sqlite = new Database(dbPath);
    const db = drizzle(sqlite);
    migrate(db, { migrationsFolder: './drizzle' });

    const tearDown = async () => {
        sqlite.close()
        await unlink(dbPath)
    }
    return [db, tearDown];
}
