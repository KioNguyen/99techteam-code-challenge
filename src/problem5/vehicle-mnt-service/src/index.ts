import "reflect-metadata";

import * as cors from "cors";
import * as express from "express";

import { myDataSource } from "./data-source";
import { Vehicle } from "./entities/vehicles.entity";

myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

const app = express();
const vehicleRepository = myDataSource.getRepository(Vehicle);

app.use(cors());
app.use(express.json());

// Middleware to introduce delay
const delayMiddleware = (req, res, next) => {
  const delay = 2000; // Delay in milliseconds (e.g., 2000ms = 2 seconds)
  setTimeout(() => next(), delay);
};

// Create a vehicle
app.post("/vehicles", delayMiddleware, async function (req, res) {
  const { type, make, model, year } = req.body;
  try {
    const vehicle = vehicleRepository.create({ type, make, model, year });
    const result = await vehicleRepository.save(vehicle);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      error: "Failed to create vehicle.",
      message: error,
    });
  }
});

// List vehicles with basic filterspx ts-node src/index.ts
app.get("/vehicles", delayMiddleware, async (req, res) => {
  const { searchKey } = req.query;
  try {
    const query = vehicleRepository.createQueryBuilder("vehicle");
    if (searchKey) {
      query.where(
        `CONCAT(
          vehicle.type, 
          vehicle.make, 
          vehicle.model,
          vehicle.year
        ) LIKE :searchKey`,
        { searchKey: `%${searchKey}%` }
      );
    }
    const vehicles = await query.getMany();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch vehicles." });
  }
});

// Get details of a vehicle
app.get("/vehicles/:id", delayMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const vehicle = await vehicleRepository.findOneBy({ id });
    if (!vehicle) {
      res.status(404).json({ error: "Vehicle not found." });
      return;
    }
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch vehicle." });
  }
});

// Update vehicle details
app.put("/vehicles/:id", delayMiddleware, async (req, res) => {
  const { id } = req.params;
  const { make, model, year, type } = req.body;
  try {
    const updatedVehicle = await vehicleRepository.save({
      id,
      make,
      model,
      year,
      type,
    });
    console.log("🚀 ~ app.put ~ updatedVehicle:", updatedVehicle);
    res.json(updatedVehicle);
  } catch (error) {
    res.status(500).json({ error: "Failed to update vehicle." });
  }
});

// Delete a vehicle
app.delete("/vehicles/:id", delayMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const vehicle = await vehicleRepository.findOneBy({ id });
    if (!vehicle) {
      res.status(404).json({ error: "Vehicle not found." });
      return;
    }
    await vehicleRepository.delete({ id });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete vehicle." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
