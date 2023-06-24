const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    date: {
        type: String
    },
    title: {
        type: String
    },
   
});

const Event = mongoose.model('Event', eventSchema);

exports.Event = Event;