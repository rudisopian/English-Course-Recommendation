const express = require('express');
const ROUTES = require('./routes/router');
const cookieParser = require('cookie-parser');
const bodyparser = require("body-parser");
const { checkUser } = require('./middleware/authMiddleware');
const dotenv = require('dotenv')
const connectDB = require('./database/connection');
const path = require('path');
const morgan = require('morgan');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// log request
app.use(morgan('tiny'));

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended : true}))

// declare dotenv
dotenv.config( { path : 'config.env'} )

// database connection
connectDB();

// load assets
app.use('/css', express.static(path.resolve(__dirname, "public/css")))
app.use('/img', express.static(path.resolve(__dirname, "public/img")))
app.use('/js', express.static(path.resolve(__dirname, "public/js")))
app.use(express.static(path.join(__dirname, "public")))

// routes render
app.get('*', checkUser);
app.use(ROUTES);

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});