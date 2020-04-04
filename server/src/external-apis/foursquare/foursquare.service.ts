import { Injectable, HttpService } from '@nestjs/common';
import { Zone } from '../../api/zone/zone';
import { map } from 'rxjs/internal/operators/map';
import { rectangleToCircle } from '../utils/rectangleToCircle';

@Injectable()
export class FoursquareService {
  constructor(private http: HttpService) {}

  private readonly API = 'https://api.foursquare.com/v2/venues/explore';
  private readonly CLIENT_ID = 'YWBCRB3LHLJEXOWRZQUSHGV1TFSEXSWOKM3AJDVJAGXOC5HR';
  private readonly CLIENT_SECRET = 'HGCTXK23LWGRWLXL0AWO1LIN0AWU0HN24SOGRAK3BN2YGOZC';
  private readonly VERSION = 20180604;
  private readonly LIMIT = 100;

  get(zone: Zone) {
    let circle = rectangleToCircle(zone);
    return this.http
      .get(this.API, {
        params: {
          client_id: this.CLIENT_ID,
          client_secret: this.CLIENT_SECRET,
          v: this.VERSION,
          ll: `${circle.center.lat},${circle.center.lng}`,
          radius: circle.radius,
          limit: this.LIMIT
        }
      })
      .pipe(map(response => response.data.response.groups[0].items))
      .toPromise();
  }
}
