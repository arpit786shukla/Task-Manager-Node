# Task Manager in Node JS
An object is used to store the tasks in memory with the format `const taskData = {"tasks":[]};`

Each title has following properties:
* id (generated automatically)
* title (can't be empty)
* description (can't be empty)
* completion_flag (boolean, for completion status)
* priority (Low, Medium or High)
* creationDate (String format of `new Date()`)

This node project allows following CRUD operations on Tasks:
* `GET /tasks` to fetch all tasks with optional query parameters 
    1. completion (true or false) to filter by completion_flag
    2. sortByCreationDate (true or false) to sort by creationDate if true

    Sample REST call: `http://localhost:3000/tasks?completion=false&sortByCreationDate=true`
* `GET /tasks/:id` to fetch a task with specific id 

    Sample REST call: `http://localhost:3000/tasks/0`
* `GET /tasks/priority/:level` to fetch tasks of specific priority level out of `[High, Medium, Low]`
    
    Sample REST call: `http://localhost:3000/tasks/priority/High`

* `POST /tasks` to create new task with body format of:
    ```
    {"title" : "Title",
    "description" : "Description",
    "completion_flag" : false,
    "priority" : "Low"
    }
    ```
    Sample REST call: `http://localhost:3000/tasks`

* `PUT /tasks/:id` to update the task with particular id with body format of:
    ```
    {"title" : "Last Task",
    "description" : "First Desc",
    "completion_flag" : false,
    "priority" : "Low"
    }
    ```

    Sample REST call: `http://localhost:3000/tasks/0`

* `DELETE /tasks/:id` to delete the task with particular id

    Sample REST call: `http://localhost:3000/tasks/0`