import * as mongoose from 'mongoose';

const Coordinate = new mongoose.Schema({
  lat: Number,
  lng: Number
});

const Options = new mongoose.Schema({
  center: Coordinate,
  radius: Number,

  bounds: [Coordinate]
});

const Drawing = new mongoose.Schema({
  type: String,
  api: String,
  options: Options
});

export const ZoneSchema = new mongoose.Schema({
  name: String,
  playing: Boolean,
  drawings: [Drawing]
});
