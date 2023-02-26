const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
// importing our model
const Todo = require('./models/todo');

// accessing models using mongoose
console.log('Todo require => ', Todo);
console.log('Todo from mongoose => ', mongoose.model('TodoModel'));

// app.use(express.json());

mongoose.connect('mongodb://localhost:27017/taskDB')

app.use('/', express.static(path.resolve(__dirname, 'assets')))
app.use(bodyParser.json());

// Create 
app.post('/api/create', async(req, res)=>{
    const record = req.body;
    console.log(record);
    // response is from MongoDB database server
    const response = await Todo.create(record);
    console.log(response);
     
    res.json({status : 'ok'})
})

// Read
app.get('/api/get', async (req, res)=>{
    // const records = [{record : 'hello'}, {record : 'world'}]
    const records = await Todo.find({})
    console.log('Response => ', records)
    res.json(records);
});

// Update
app.post('/api/modify', async (req, res)=>{
    const {old : oldTitle, new : newTitle} = req.body;

    // update
    const response = await Todo.updateOne({
        record : oldTitle
    }, {
        // set just changes the value needed to be updated and doesnt destroys the date/ field not changed
        $set: {record : newTitle}
    })
    console.log(response);
    res.json({status : 'ok'});
})

// Delete
app.post('/api/delete', async (req, res)=>{
    const {record} = req.body;
    console.log(record, '/api/delete');
    // deleting a record
    const response = await Todo.deleteOne({record});
    console.log(response, '/api/delete response');
    res.json({status : 'ok'});
})

app.listen(5000, ()=> console.log(`Listening on port ${port}...`));