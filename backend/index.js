const express = require('express');
const app = express();
const cors = require('cors');
const mongoDb = require('./mongodb');

require('dotenv').config();

// Connect to MongoDB
mongoDb();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Specify the exact origin instead of wildcard
  credentials: true, // Allow credentials (cookies)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

// app.use('/api/auth', require('./routes/auth'));
app.use('/api/', require('./routes/signup'));
app.use('/api/', require('./routes/login'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
