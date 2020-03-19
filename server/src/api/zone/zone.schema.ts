import * as mongoose from 'mongoose';

const BoundSchema = new mongoose.Schema({
  lat: Number,
  lng: Number
});

export const ZoneSchema = new mongoose.Schema({
  name: String,
  bounds: [BoundSchema]
});
