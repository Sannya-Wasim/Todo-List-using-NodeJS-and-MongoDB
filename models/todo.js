const mongoose = require('mongoose');
 
const TodoSchema = new mongoose.Schema({
    record : {type : String, require : true},
    date : {type : Number, default : Date.now()}
})

// mongoose creates a collection by converting the model name to lowercase and adding an s
const model = mongoose.model('TodoModel', TodoSchema);

module.exports = model