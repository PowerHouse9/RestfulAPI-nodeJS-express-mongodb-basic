const mongoose = require ('mongoose');

// schema is like model, it is used to describe the way of your data looks
const PostSchema = mongoose.Schema({
    // title: String,
    //make it as object to describe this title to make it possible to make it required
    title: {
        type: String,
        required: true
    },
    description: String,
    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Posts', PostSchema);