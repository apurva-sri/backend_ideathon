import express from 'express';
import dotenv from 'dotenv';
import narrationRoutes from './routes/narrationRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.send('🌐 Backend is running.'));
app.use('/api/narration', narrationRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
