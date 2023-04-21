const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('express').Router();
const taskManager = require('./routes/taskManager');

const app = express();
app.use(cors());
app.use(routes);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = 3000;

routes.get('/', (req, res)=>{
  res.status(200).send("Welcome to Task Manager by Arpit Shukla");
});

routes.use('/tasks', taskManager);

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running and App is listening on port " + PORT);
    else
        console.log("Error occurred, server can't start", error);
    }
);