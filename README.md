# TASK-MANAGEMENT

## Introduction
This project provides a comprehensive platform for managing tasks, including user management, task creation, and task management. The platform is designed to be scalable and efficient, ensuring robust performance.

## Error Handling
This application includes comprehensive error handling, providing meaningful error messages and status codes for various failure scenarios.

**Note**: After setting up the application, Swagger UI documentation is provided for testing the application. Access it by opening the application at the specified port.

## Features

### User Management:
- **User Registration**: Users can register on the platform.
- **User Authentication**: Secure login mechanisms for users.
- **Profile Management**: Users can update their profiles.
- **User Logout**: Users can securely log out from the platform.

### Task Management:
- **Task Creation**: Users can create tasks with a title and description.
- **View Tasks**: Users can view a list of all tasks.
- **Mark Task as Completed**: Users can mark tasks as completed.
- **Edit Tasks**: Users can edit task details.
- **Delete Tasks**: Users can delete tasks.

## Tech Stack
- **Node.js**: Server-side runtime environment.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing data.
- **JWT Authentication**: Secure authentication mechanism for user login.

## Setup
1. Clone the repository: `git clone https://github.com/suranjit231/task-management.git`
2. Install dependencies using `npm install`.
3. Set up MongoDB database and configure connection in `connectMongoDB.js`.
4. Set up environment variables in `.env` file (PORT, JWT_SECRET, DB_URL).
5. Start the server using `npm start`.
6. Open the port at `localhost:PORT/api-docs` to test the application.

## API Endpoints

### User Routes
- **POST /api/users/signup**: User signup
  - Request body: `{ "username": "string", "email": "string", "password": "string" }`
  - Response: `{ "success": true, "data": { "userId": "string", "email": "string" } }`

- **POST /api/users/signin**: User signin
  - Request body: `{ "email": "string", "password": "string" }`
  - Response: `{ "success": true, "token": "string" }`

- **PUT /api/users/updateProfile**: Update user profile
  - Request headers: `{ "Authorization": "jwtToken <token>" }`
  - Request body: `{ "name": "string", "avatar": "file" }`
  - Response: `{ "success": true, "data": { "userId": "string", "name": "string", "avatar": "string" } }`

- **GET /api/users/logout**: User logout
  - Request headers: `{ "Authorization": "jwtToken <token>" }`
  - Response: `{ "success": true, "message": "Logout successful" }`

### Task Routes
- **POST /api/tasks/createTask**: Create a new task
  - Request headers: `{ "Authorization": "jwtToken <token>" }`
  - Request body: `{ "title": "string", "description": "string", "dueDate": "date", "category": "string" }`
  - Response: `{ "success": true, "data": { "taskId": "string", "title": "string", "description": "string" } }`

- **PUT /api/tasks/markTask/:id**: Mark task as completed
  - Request headers: `{ "Authorization": "jwtToken <token>" }`
  - Request params: `{ "id": "string" }`
  - Response: `{ "success": true, "data": { "taskId": "string", "status": "completed" } }`

- **GET /api/tasks/viewAllTask**: View all tasks
  - Request headers: `{ "Authorization": "jwtToken <token>" }`
  - Response: `{ "success": true, "data": [ { "taskId": "string", "title": "string", "description": "string" } ] }`

- **GET /api/tasks/pendingTask**: View all pending tasks
  - Request headers: `{ "Authorization": "jwtToken <token>" }`
  - Response: `{ "success": true, "data": [ { "taskId": "string", "title": "string", "description": "string" } ] }`

- **GET /api/tasks/byCategory**: Filter tasks by category
  - Request headers: `{ "Authorization": "jwtToken <token>" }`
  - Request query: `{ "category": "string" }`
  - Response: `{ "success": true, "data": [ { "taskId": "string", "title": "string", "category": "string" } ] }`

- **GET /api/tasks/bySearch**: Search tasks by term
  - Request headers: `{ "Authorization": "jwtToken <token>" }`
  - Request query: `{ "searchTerm": "string" }`
  - Response: `{ "success": true, "data": [ { "taskId": "string", "title": "string" } ] }`

- **PUT /api/tasks/updateTask**: Update a task
  - Request headers: `{ "Authorization": "jwtToken <token>" }`
  - Request query: `{ "taskId": "string" }`
  - Request body: `{ "description": "string", "dueDate": "date", "category": "string" }`
  - Response: `{ "success": true, "data": { "taskId": "string", "description": "string" } }`

- **DELETE /api/tasks/deleteTask**: Delete a task
  - Request headers: `{ "Authorization": "jwtToken <token>" }`
  - Request query: `{ "taskId": "string" }`
  - Response: `{ "success": true, "message": "Task deleted successfully" }`


##TASK-MANAGEMENT
```
##Root
|           |               
|           |                            |
|           |---->connectMongodb------>  |-->mongodbConnect.js
|           |                            |
|           |
|--->src--->|               |            |-->user.controller.js   
|           |               |-->users--->|-->user.routes.js
|           |               |            |-->user.repository.js  
|           |--->feature--> |            |-->userSchema.js  
|           |               |
|           |               |            |-->task.controller.js
|           |               |--->task--->|-->task.repositroy.js
|           |               |            |-->task.routes.js
|           |               |            |-->taskSchema.js
|           |               |
|           |                                                                                                          
|           |              
|           |-->middleware->|-->jwtAuth.middleware.js
|           |               |-->fileUpload.middleware.js
|           |               
|           |
|           |
|           |--->utility--->|-->hashedPassword.js
|           |               |-->errorHandler.js
|           |
|
|
|-->uploads
|-->.env
|-->package.lock.json
|-->package.json
|-->node_module
|-->README.md
||-->server.js
```
