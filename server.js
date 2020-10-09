const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

require('./app/routes/note.routes.js')(app);

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url,{
    useNewUrlParser: true
}).then(() => {
    console.log('Successfully Connected to db')
}).catch(err => {
    console.log(err);
    process.exit();
});

app.get('/',(req, res) => {
    res.json({"Message":"Welcome to Notes App"})
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});