const mongoose = require('mongoose');
const schema = mongoose.Schema;

const recognizedSchema = new schema({
    name:{
        type: String,
        required: true
    },
    origin:{
        type: String,
        required: true
    },
    coat_length:{
        type: String,
        required: true
    },
    possible_colors:{
        type: Array,
        required: true
    },
    created_at:{
        type: Date,
        default: Date.now
    },
});

const Recognized = mongoose.model('Recognized', recognizedSchema);

module.exports = Recognized;