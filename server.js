//bring in express
const express = require('express');
//pulling in the config db setup
const connectDB = require('./config/db');
//init app variable with express
const app = express();

//connect database
connectDB();

//Init Middleware lets us access req.body 
app.use(express.json({extended: false}));

//testing endpoint
app.get('/', (req, res) => res.send('API Running'));

//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

//init PORT variable
const PORT = process.env.PORT || 5000;
//getting the app variable and listening on a port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

//refer to json script for server initialisation
// 'scripts': {
//   'start': 'node server',
//   'server': 'nodemon server'
// },
