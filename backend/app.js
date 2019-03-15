//modules
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const cors = require('cors');

//instanciando a aplicação
    const app = express();

//database
    mongoose.connect('mongodb://localhost:27017/appoeb', { useNewUrlParser: true });

//config
//cors
    app.use(cors());
//express
    app.use(express.json()); //permite a aplicação trabalhar com json
    app.use(express.urlencoded({ extended: true })); //facilitador de envio de arquivos
//require-dir
    requireDir('./src/app/models');
//morgan
    app.use(morgan('dev'));

//root routes
    app.use('/auth', require('./src/app/controllers/userController'));
    app.use('/posts', require('./src/app/controllers/imageController'));

//server
    app.listen(3002);