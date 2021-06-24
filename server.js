const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

// parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

// panggil routes
const routes = require('./routes');
routes(app);

// daftarkan menu dari index
app.use('/auth', require('./middleware'));

app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});