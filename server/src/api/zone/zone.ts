export interface Zone {
  name: string;
  bounds: Bound[];
}

interface Bound {
  lat: number;
  lng: number;
}
