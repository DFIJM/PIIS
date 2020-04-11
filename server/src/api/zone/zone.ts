export interface Zone {
  name: string;
  playing: boolean;
  drawings: Drawings[];
}

interface Drawings {
  type: 'RECTANGLE' | 'CIRCLE';
  api: 'openstreetmap' | 'foursquare' | 'twitter';
  options: CircleOptions | RectangleOptions;
}

interface CircleOptions {
  center: Coordinate;
  radius: number;
}

interface RectangleOptions {
  bounds: Coordinate[];
}

interface Coordinate {
  lat: number;
  lng: number;
}
