const express = require('express');
const app = express();
const morgan = require('morgan');
app.use(morgan('dev'));
const path = require('path');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors());
require('./db/mongoDb');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Routes
const projectlistRoute = require('./routes/projectslistRoute');
const mentorslistRoute = require('./routes/mentorslistRoute');

const mentorroute = require('./routes/Mentorroute');
// const adminroute = require('./routes/adminroute');
const loginroute = require('./routes/login');
const submissionroute = require('./routes/submissionRoutes');
const referenceroute = require('./routes/reference');


app.use('/mentor', mentorroute);
// app.use('/admin', adminroute);
app.use('/login', loginroute);
app.use('/submission', submissionroute);
app.use('/reference', referenceroute);

app.use('/admin', projectlistRoute)
app.use('/admin', mentorslistRoute)


// cors error solveing during deployment
app.use(cors({
    origin: ['https://ictak-internship-portal-client.vercel.app/'],
    credentials: true,
    methods: ['POST', 'GET', 'PATCH', 'DELETE']
}));


//deployment
app.use(express.static(path.join(__dirname, 'dist')));

// Anything that doesn't match the above, send back index.html
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(process.env.PORT, () => {
    console.log(`server is listening on PORT ${process.env.PORT}`);
})