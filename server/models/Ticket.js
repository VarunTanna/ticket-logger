const { Schema, model } = require('mongoose');

const ticketSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    order: {
        type: Number,
    },
    type: {
        type: String,
        trim: true,
    },
    duedate: {
        type: Date
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'project',
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    }
});

const Ticket = model('Ticket', ticketSchema);

module.exports = Ticket;
