export interface Zone {
  name: string;
  playing: boolean;
  drawings: Drawing[];
}

export interface Drawing {
  type: 'RECTANGLE' | 'CIRCLE';
  api: 'openstreetmap' | 'foursquare' | 'twitter';
  options: CircleOptions | RectangleOptions;
}

export interface CircleOptions {
  center: Coordinate;
  radius: number;
}

export interface RectangleOptions {
  bounds: Coordinate[];
}

export interface Coordinate {
  lat: number;
  lng: number;
}
