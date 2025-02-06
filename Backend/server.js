import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './connect.js';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

(async () => {
  await connectDB(); // Ensure the database connection is established before starting the server
  app.use('/api/auth', authRoutes);

  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
})();
