/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import express from 'express';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

export const app = express();

app.disable('x-powered-by');

// middlewares - list of functions that execute, in order, before controllers
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));
// my middleware
const log = (req, res, next) => {
  console.log('calling log middleware...');
  // call the next controller or middleware
  next();
}

// use my middleware
app.use(log);

// create a route that sends back some json
app.get('/', function (req, res) {
  // the callback function is called a controller
  res.send({ message: 'Hello Desmond' });
})
// another example
app.get('/cats', (req, res) => {
  res.send('This is a GET request method at ...3000/cats!');
})
// another example but this one uses my middleware
app.get('/des', log, (req, res) => {
  res.send('another example but this one calls my middleware')
})


// create a route that receives data and logs it
app.post('/', function (req, res) {
  const data = req.body;
  console.log(data);
  res.send({ message: 'ok' });
})
// another example
app.post('/saint', (req, res) => {
  res.send('This is a POST request method at ...3000/saint');
})

// ROUTES
const router = express.Router();
router.get('/dogs', (req, res) => {
  res.send('GET: using express.Router() to match url patterns...')
})
// the route needs to be attached to our app before it can be used
app.use('/api', router);  // the route is now available on http../api/dogs

// Router verbs methods get(), post(), put(), delete()
// const routes = ['get /cat', 'post /cat', 'get /cat/:id', 'put /cat/:id', 'delete /cat/:id']
// verb takes controller as argument
router.route('/cat')
  .get(myController)
  .post(myController);

router.route('/cat/:id')
  .post(myController)
  .put(myController)
  .delete(myController);

export const start = () => {
  app.listen(3000, () => {
    console.log('Server is listening on port http://127.0.0.1:3000');
  })
};


/** A dummy controller function */
function myController(req, res) {
  res.send('Calling my dummy controller funtion')
}