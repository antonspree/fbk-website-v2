import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

function createDb() {
  const url = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL (oder POSTGRES_URL) fehlt. Vercel Postgres anbinden und Env setzen."
    );
  }
  const sql = neon(url);
  return drizzle(sql, { schema });
}

type DbInstance = ReturnType<typeof createDb>;

const globalForDb = globalThis as unknown as { __fbkDb?: DbInstance };

function getDb(): DbInstance {
  if (!globalForDb.__fbkDb) {
    globalForDb.__fbkDb = createDb();
  }
  return globalForDb.__fbkDb;
}

export const db = new Proxy({} as DbInstance, {
  get(_target, prop, receiver) {
    return Reflect.get(getDb(), prop, receiver);
  },
});

export type Db = typeof db;
