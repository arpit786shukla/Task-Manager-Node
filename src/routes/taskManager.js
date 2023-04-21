const taskRoutes = require('express').Router();
const taskData = {"tasks":[]};
let lastTaskId = 0;
const validator = require('../helpers/validator');
const bodyParser = require('body-parser');

taskRoutes.use(bodyParser.urlencoded({ extended: false }));
taskRoutes.use(bodyParser.json());

taskRoutes.delete('/:id', (req, res) => {
    const taskIdPassed = req.params.id;
  if(!validator.isInt(taskIdPassed)){
    res.status(400);
    res.send({"message": "Task Id should be number", "status": false});
  }
  else{
    let result = taskData.tasks.filter(val => val.id == taskIdPassed);
  if(Object.keys(result).length === 0){
      res.status(404);
      res.send({"message": "Task not found", "status": false});
  }
  else{
    let tasks = taskData.tasks;
    tasks = tasks.filter(task => task.id != taskIdPassed);
    taskData.tasks = tasks;
    res.status(200);
  res.send({"message": "Task deleted successfully", "status":true});
  }
}
});
taskRoutes.put('/:id', (req, res) => {
    let taskDetails = req.body;
  const taskIdPassed = req.params.id;
  if(!validator.isInt(taskIdPassed)){
    res.status(400);
    res.send({"message": "Task Id should be number", "status": false});
  }
  else if(validator.validateTaskInfo(taskDetails).status) {      
    let result = taskData.tasks.filter(val => val.id == taskIdPassed);
  if(Object.keys(result).length === 0){
      res.status(404);
      res.send({"message": "Task not found", "status": false});
  }
  else{
    for(let task of taskData.tasks){
        if(task.id == taskIdPassed){
            task.title = taskDetails.title;
            task.description = taskDetails.description;
            task.completion_flag = taskDetails.completion_flag;
            task.priority = taskDetails.priority;
            break;
        }
    }
  res.status(200);
  res.send({"message": "Task updated successfully", "status":true});
  }
}
else {
    res.status(400);
    res.json(validator.validateTaskInfo(taskDetails))
  }
});

taskRoutes.post('/', (req, res) => {
  let taskDetails = req.body;
  taskDetails.id = lastTaskId;
  lastTaskId++;
  const date = new Date();
  taskDetails.creationDate = date.toString();
  if(validator.validateTaskInfo(taskDetails).status) {
    taskData.tasks.push(taskDetails);
    res.status(200);
    res.json(validator.validateTaskInfo(taskDetails));
  } else {
    res.status(400);
    res.json(validator.validateTaskInfo(taskDetails))
  }
});

taskRoutes.get('/', (req, res) => {
    let getTasks = taskData.tasks;
    let completion_flag = true;
    if(req.query.completion != undefined && (req.query.completion == "true" || req.query.completion == "false")){
        if (req.query.completion == "true"){
            completion_flag = true;
        }
        else{
            completion_flag = false;
        }
        getTasks = getTasks.filter(task => task.completion_flag == completion_flag);
    }
    if(req.query.sortByCreationDate != undefined && req.query.sortByCreationDate == "true"){
        getTasks = getTasks.sort(function(a,b){
            const date1 = new Date(a.creationDate);
            const date2 = new Date(b.creationDate);
            return date2 - date1;
        });
    }
  res.status(200);
  res.send(getTasks);
});

taskRoutes.get('/:id', (req, res) => {
    let taskIdPassed = req.params.id;
    let result = taskData.tasks.filter(val => val.id == taskIdPassed);
    if(Object.keys(result).length === 0){
        res.status(404);
        res.send({"message": "Task not found", "status": false});
    }
    else{
    res.status(200);
    res.send(result);
    }
});

taskRoutes.get('/priority/:level', (req, res) => {
    let taskPriorityPassed = String(req.params.level);
    if(!validator.isPriority(taskPriorityPassed)){
        res.status(400);
        res.send({"message": "Unknown Priority type", "status": false})
    }
    else{
        let result = taskData.tasks.filter(val => val.priority == taskPriorityPassed);
        res.status(200);
        res.send(result);
    }
    
})

module.exports = taskRoutes;