const express = require('express')
const connectToMongo = require('./database');
const path = require('path');
var cors = require('cors'); 
require("dotenv").config();
var hbs = require('hbs');


connectToMongo();
const app = express()
const port = process.env.PORT || 5000;
app.use(cors())
app.use(express.json())
app.use(express.urlencoded())


//Static Files
const static_path = path.join(__dirname, 'public')
app.use(express.static(static_path));


//Handle Bar
const template_path = path.join(__dirname, 'views')
const partials_path = path.join(__dirname, 'views/partials')
app.set('view engine',"hbs");
app.set('views',template_path);
hbs.registerPartials(partials_path)


app.get('/',(req,res)=>{
  var props ={title:"Homepage"}
  res.render('index.hbs',props);
})
app.get('/signup',(req,res)=>{
  var props ={title:"Signup"}
  res.render('signup.hbs',props);
})
app.get('/login',(req,res)=>{
  var props ={title:"Login"}
  res.render('login.hbs',props);
})

// Available Routes
app.use('/', require('./routes/signup'));
app.use('/', require('./routes/login'));
app.use('/', require('./routes/logout'));

app.use('/', require('./routes/user_datas'))


app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`)
})