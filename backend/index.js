const express = require('express');
const cors = require('cors');
require("dotenv").config(); 
const connection = require('./config/db');
const loginRoute = require('./routes/login');
const analysisRoute = require('./routes/analytics');
const budgetRoute = require('./routes/budget');
const savingRoute = require('./routes/savings');
const transactionRoute = require('./routes/transaction');
const userRoute = require('./routes/user');

const app = express();
app.use(cors());

connection();

app.use(express.json());
app.use(cors());

app.use('/api/login', loginRoute);
app.use('/api/analysis', analysisRoute);
app.use('/api/budget', budgetRoute);
app.use('/api/savings', savingRoute);
app.use('/api/transaction', transactionRoute);
app.use('/api/user', userRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
