import express from 'express';
import 'dotenv/config';
import "./config/db"


const app = express();
app.use(express.json());

const startServer = async () => {
    try {
        // initializeDatabase();
        app.listen(process.env.port || 6000, () => {
            console.log(`Server is running on port ${process.env.port || 6000}`);
        });
    } catch (err) {
        console.error("Failed to start server:", err);
        process.exit(1);
    }
};

startServer();