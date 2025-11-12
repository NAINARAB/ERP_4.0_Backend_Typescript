import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./config/dbConfig";
import appRoutes from './routes/routerIndex';
import { sequelize } from "./config/sequalizer";
import { listRoutes } from "./config/apiDoc";
import path from 'path';
import fs from 'fs';
import { staticPaths } from './staticPath'

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
app.use(express.urlencoded({ extended: true }));

connectDB();

(async () => {
    try {
        await sequelize.authenticate();
        // await sequelize.sync({ force: false, alter: false });
        console.log('seqalizer initialized');
    } catch (err) {
        console.error('seqalizer initialization failed', err);
    }
})();

const uploadsRoot = path.resolve(process.cwd(), "uploads");
if (!fs.existsSync(uploadsRoot)) fs.mkdirSync(uploadsRoot);

const productsDir = path.join(uploadsRoot, "products");
const attendanceDir = path.join(uploadsRoot, "attendance");
const forumDocumentDir = path.join(uploadsRoot, "forumDocuments");
const retailerDir = path.join(uploadsRoot, "retailers");
const visitLogDir = path.join(uploadsRoot, "visitLogs");

if (!fs.existsSync(productsDir)) fs.mkdirSync(productsDir);
if (!fs.existsSync(attendanceDir)) fs.mkdirSync(attendanceDir);
if (!fs.existsSync(forumDocumentDir)) fs.mkdirSync(forumDocumentDir);
if (!fs.existsSync(retailerDir)) fs.mkdirSync(retailerDir);
if (!fs.existsSync(visitLogDir)) fs.mkdirSync(visitLogDir);

app.use('/api', appRoutes);

app.use('/api', (req, res) => {
    try {
        return listRoutes(app, res);
    } catch (e) {
        console.error(e);
        res.status(500).send('Failed to list routes');
    }
});

const reactBuildPath = path.join(__dirname, 'frontend');
app.use(express.static(reactBuildPath));

// staticPaths.forEach(({ route, folder }) => {
//     const resolvedPath = path.join(__dirname, folder);
//     app.use(route, express.static(resolvedPath));
// });

app.get('*', (req, res) => {
    res.sendFile(path.join(reactBuildPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
