const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected ✅'))
    .catch((err) => console.error('MongoDB connection error ❌:', err));

const sampleSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String
});

const Sample = mongoose.model('sample', sampleSchema);

// POST /add — create a new document
app.post('/add', async (req, res) => {
    try {
        const newDoc = new Sample(req.body);
        await newDoc.save();
        res.status(201).send('Document added successfully ✅');
    } catch (err) {
        res.status(500).send('Error adding document ❌: ' + err.message);
    }
});

// GET /samples — fetch all documents
app.get('/samples', async (req, res) => {
    try {
        const docs = await Sample.find();
        res.status(200).json(docs);
    } catch (err) {
        res.status(500).send('Error fetching documents ❌: ' + err.message);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT} 🚀`);
});
