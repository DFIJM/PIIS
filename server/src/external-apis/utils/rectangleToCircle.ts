import { Zone } from '../../api/zone/zone';
import { getDistance, getCenterOfBounds } from 'geolib';

export function rectangleToCircle(rectangle: Zone): Circle {
  let radius = Math.min(
    getDistance(rectangle.bounds[0], rectangle.bounds[1]),
    getDistance(rectangle.bounds[1], rectangle.bounds[2])
  );
  let center = getCenterOfBounds(rectangle.bounds);

  return {
    radius,
    center: { lat: center.latitude, lng: center.longitude }
  };
}

export interface Rectangle {}

export interface Circle {
  radius: number;
  center: { lat: number; lng: number };
}
