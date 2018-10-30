// Here we specify external JavaScript modules that we want to be loaded
const express = require('express');
const axios = require('axios');
const logger = require('morgan');

/*
  Create a new express app. This handles just about all the boilerplate for
  setting up a server to be able to listen for and respond to requests over HTTP.
*/
const app = express();

// Sets up the logger module that we pulled in to run as middleware in our app
app.use(logger('dev'));

/*
  Sets the applicationn port equal to the value of the PORT environment variable,
  or to 5000 if that variable is not specified.

  For example, we could start the app on port 6000 by running `PORT=6000 npm start`
*/
app.set('port', (process.env.PORT || 5000))

app.get('/', function(request, response) {
  response.send('Hello World!')
});

app.get('/todo', async (request, response) => {
  try {
    const todo = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
      .then(res => res.data);
    response.json(todo);
  } catch (e) {
    console.log(e);
  }
});

app.listen(app.get('port'), () => {
  console.log("Node app is running at localhost:" + app.get('port'))
})
