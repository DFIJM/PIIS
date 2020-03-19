import { Injectable, HttpService } from '@nestjs/common';
import { Zone } from '../../api/zone/zone';

@Injectable()
export class TwitterService {
  constructor(private http: HttpService) {}

  private readonly API = 'https://api.twitter.com';

  get(zone: Zone) {}
}
