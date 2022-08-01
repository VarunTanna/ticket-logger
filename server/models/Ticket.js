const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const ticketSchema = new Schema({
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    skills: [
      {
        type: String,
        trim: true,
      },
    ],
  });
  
  // set up pre-save middleware to create password
  ticketSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });
  
  // compare the incoming password with the hashed password
  ticketSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };
  
  const Ticket = model('Profile', ticketSchema);
  
  module.exports = Ticket;
  