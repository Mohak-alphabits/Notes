import mongoose from "mongoose";
const { Schema, Types } = mongoose;

const notesSchema = new mongoose.Schema({
  userId: { 
    type: Types.ObjectId,
    ref: 'User' 
  },
  
  title: { 
    type: String 
  },
  description: { 
    type: String, 
  },
});

export const Note = mongoose.model('Note', notesSchema);