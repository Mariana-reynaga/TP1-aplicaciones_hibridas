const mongoose = require('mongoose');
const schema = mongoose.Schema;

const experimentalSchema = new schema({
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
        enum: ['short', 'long', 'bald'],
        default: 'short',
        required: true
    },
    possible_color:{
        type: String,
        enum: ['white', 'black', 'ginger', 'tabby', 'blue', 'brown', 'calico', 'rosette'],
        default: 'white',
        required: true
    },
    created_at:{
        type: Date,
        default: Date.now
    },
});

const Experimental = mongoose.model('Experimental', experimentalSchema);

module.exports = Experimental;