import "dotenv/config";
import express from "express";
import cors from "cors";
import { router as authRoutes } from "./routes/auth.js";
import { router as carsRoutes } from "./routes/cars.js";
import { router as advertsRoutes } from "./routes/adverts.js";
import { router as predictRoutes } from "./routes/predict.js";

// import { dbInsertCars } from "./utils/dbInsertCars.js";

const app = express();
const PORT = Number(process.env.PORT);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use("/api", authRoutes);
app.use("/cars", carsRoutes);
app.use("/adverts", advertsRoutes);
app.use("/predict", predictRoutes);

// await dbInsertCars();

app.listen(PORT, () => {
  console.log(`Server çalışıyor: http://localhost:${PORT}`);
});
