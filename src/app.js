const logger = require('morgan');
const express = require('express');
const cookieParser = require('cookie-parser');
const indexRouter = require('./routes/index');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
const config = require ('./config');

const jsonErrorHandler = async (err, req, res, next) => {
  res.status(500).send({ error: {
    message: err.message
  }});
};

app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use('/v1', indexRouter);

app.use(jsonErrorHandler);

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const specs = swaggerJsdoc(config.swagger);

specs.apis = ['./routes/index.js'];

app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(function (req, res, next) {
  res.status(404).send({error: "Not found"});
});
module.exports = app;
