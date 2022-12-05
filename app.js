const express = require('express');
const morgan = require('morgan');
const path = require('path');
const debug = require('debug')('http')
require('dotenv').config()

const app = express();
const port = process.env.PORT;

const indexRouter = require(path.join(__dirname, "routes/index.js"));
const categoryRouter = require(path.join(__dirname, "routes/categories.js"));
const productRouter = require(path.join(__dirname, "routes/products.js"));

app.set('views', path.join(__dirname,"views"));
app.set('view engine', 'pug');

app.use(morgan('tiny'));
app.use(express.static("public"));

app.use("", indexRouter);
app.use("/categories", categoryRouter);
app.use("/products", productRouter);

app.listen(port, () => {debug(`Listening on port ${port}.`);});