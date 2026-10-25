import { pool } from "./pool.js";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const schemaPath = fileURLToPath(new URL("./schema.sql", import.meta.url));

const schema = await readFile(schemaPath, "utf-8");

try {
  await pool.query(schema);
  console.log("Database tables created");
} finally {
  await pool.end();
}
