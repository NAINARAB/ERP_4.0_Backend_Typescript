import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./config/dbConfig";
import appRoutes from './routes/routerIndex';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({
  origin: "*",
  // http://localhost:5174
  credentials: true,
}));

app.use(express.json());
app.use(morgan("dev"));

connectDB();

app.use('/api', appRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
