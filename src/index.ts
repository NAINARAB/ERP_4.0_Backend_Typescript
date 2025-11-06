import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./config/dbConfig";
import appRoutes from './routes/routerIndex';
import { sequelize } from "./config/sequalizer";
import { listRoutes } from "./config/apiDoc";

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

(async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: false, alter: false });
        console.log('seqalizer initialized');
    } catch (err) {
        console.error('seqalizer initialization failed', err);
    }
})();

app.use('/api', appRoutes);

app.use('/api', (req, res) => {
    try {
        return listRoutes(app, res);
    } catch (e) {
        console.error(e);
        res.status(500).send('Failed to list routes');
    }
});

const rootStack: any[] = (app as any)?._router?.stack ?? [];
rootStack.forEach((layer: any) => {
  const src = layer.regexp?.source;
  if (layer.handle?._router || layer.handle?.stack) {
    console.log('LAYER:', { name: layer.name, path: layer.path, rx: src });
  }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
