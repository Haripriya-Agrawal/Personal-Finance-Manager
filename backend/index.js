const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const signup = require('./routes/signup');

const app = express();
app.use(cors());

connectDB();

app.use(express.json());

app.use('/api/signup', signup);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
