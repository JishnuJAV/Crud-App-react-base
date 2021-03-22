const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();


const DbService = require('./dbService');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//Read
app.get('/api/get', (req,res)=>{
    const db = DbService.getDbServiceInstance();

      const results = db.getAllData();

      results
      .then(data => res.json({data : data}))
      .catch(err => console.log(err));
});

//create
app.post('/api/addpost', (req,res)=>{
    // const firstname = req.body.firstname;
    // const lastname = req.body.lastname;
    // const email = req.body.email;
    const { firstname, lastname, email } =req.body;
    console.log("In app",firstname, lastname, email);
    const db = DbService.getDbServiceInstance();
    const result = db.insertNewPost(firstname,lastname,email);
    
    result
    .then(data => res.json({data : data}))
    .catch(err => console.log(err));
    

});

//delete
app.delete('/api/delete/:id',(req, res)=>{
    console.log(req.params);
    const {id} = req.params;
    const db = DbService.getDbServiceInstance();

    const result = db.deleteRowById(id);

    result
    .then((data) =>{res.json({success : data})})
    .catch(err => console.log(err));
});

//get column 
app.get('/api/edit/:id',(req, res)=>{
    console.log(req.params);
    const {id} = req.params;
    const db = DbService.getDbServiceInstance();

    const result = db.getUser(id);

    result
    .then((data) =>{res.json({success : data})})
    .catch(err => console.log(err));
});

//update by id user
app.post('/updatepost/:id', (request,response)=>{
    const {firstname, lastname, email } =request.body;
    const id = request.params['id'];

    const db = DbService.getDbServiceInstance();

    const result = db.updateRowById(id,firstname,lastname,email);

    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));

});


//update
app.patch('/api/update/:email', (req, res)=>{
    const {firstname, lastname } =req.body;
    const {email} = req.params;
    // const email = req.body.email;
 
     const db = DbService.getDbServiceInstance();
 
     const result = db.updateRowByEmail(firstname,lastname,email);
 
     result
     .then(data => res.json({success : data}))
     .catch(err => console.log(err))
 
})

app.listen(process.env.PORT, ()=>{
    console.log('app is RUnning..!!')
});