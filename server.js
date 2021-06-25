const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')

// parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

// panggil routes
const routes = require('./routes');
routes(app);

// daftarkan menu dari index
app.use('/auth', require('./middleware'));

app.listen(3001, () => {
    console.log(`Server started on port 3001`);
});