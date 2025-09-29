const bodyParser = require('body-parser');
const express = require('express');
const app = express();

require('dotenv').config();

app.use(bodyParser.json({limit: '10mb'}));
app.use(express.static('static'));

const apiRouter = require('./routes/api');
app.use('/api', apiRouter);

app.listen(process.env.PORT, () => 
{
    console.log(`Example app listening on port ${process.env.PORT}`);
});