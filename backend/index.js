require('dotenv').config();

const express = require ('express');
const cors = require ('cors');
const axios = require('axios');


const app = express();
const PORT = 5000;
const DAILY_API_KEY = process.env.DAILY_API_KEY;

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// Sample route
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.post('/create-room', async (req, res) => {
    try {
        const response = await axios.post(
        'https://api.daily.co/v1/rooms',
        {
            properties: {
            enable_chat: true,
            exp: Math.floor(Date.now() / 1000) + 3600, // expires in 1 hour
            },
        },
        {
            headers: {
            Authorization: `Bearer ${DAILY_API_KEY}`,
            'Content-Type': 'application/json',
            },
        }
        );

        res.json(response.data);
    } catch (err) {
        console.error('Error creating room:', err?.response?.data || err.message);
        res.status(500).json({ error: 'Room creation failed' });
    }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});