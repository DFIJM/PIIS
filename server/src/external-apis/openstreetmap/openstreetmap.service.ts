import { Injectable, HttpService } from '@nestjs/common';
import { Zone } from '../../api/zone/zone';

@Injectable()
export class OpenStreetMapService {
  constructor(private http: HttpService) {}

  private readonly API = 'https://api.openstreetmap.com';

  get(zone: Zone) {}
}
