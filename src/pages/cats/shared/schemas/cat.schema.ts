import * as mongoose from 'mongoose';

export const CATS_SCHEMA = new mongoose.Schema({
  name: String,
  age: Number,
  breed: String,
}, { versionKey: false });
