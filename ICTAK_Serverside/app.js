const express = require('express');
const app = express();
const morgan = require('morgan');
app.use(morgan('dev'));
require('dotenv').config();
const cors = require('cors');
app.use(cors());
require('./db/mongoDb');














app.listen(process.env.PORT, () => {
    console.log(`server is listening on PORT ${process.env.PORT}`);
})

