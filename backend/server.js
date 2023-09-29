import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const PORT = process.env.PORT || 5000;
connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.use("/api/products", productRoutes);

app.use(notFound);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server at http://localhost:${PORT}`);
});