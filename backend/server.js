const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// 1. Routes Import - Namma ippo create panna ella routes-aiyum inga connect panrom
const workflowRoutes = require('./routes/workflowRoutes');
const stepRoutes = require('./routes/stepRoutes');
const executionRoutes = require('./routes/executionRoutes');

const app = express();

// 2. Middlewares
app.use(cors()); // Frontend kooda connect panna help pannum
app.use(express.json()); // JSON data-va handle panna

// 3. API Endpoints
// Workflow run panna: POST /api/workflows/:id/execute
app.use('/api/executions', executionRoutes);
app.use('/api/workflows', workflowRoutes);
app.use('/api/steps', stepRoutes);

// Basic Home Route (Server check panna)
app.get('/', (req, res) => {
    res.send('Halleyx Workflow Engine Backend is Running!');
});

// 4. Database Connection & Server Start
const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/workflowDB';

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("-----------------------------------------");
        console.log("✅ Database Connected Successfully!");
        
        app.listen(PORT, () => {
            console.log(`🚀 Server is flying on port ${PORT}`);
            console.log("-----------------------------------------");
        });
    })
    .catch(err => {
        console.error("❌ Database Connection Error:", err);
    });