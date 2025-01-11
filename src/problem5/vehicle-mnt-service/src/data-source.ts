import "reflect-metadata";

import { DataSource } from "typeorm";
import { Vehicle } from "./entities/vehicles.entity";

export const myDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Vehicle],
  migrations: ["src/migrations/*.ts"],
  logging: !!process.env.DB_LOGGING,
  synchronize: true,
});
