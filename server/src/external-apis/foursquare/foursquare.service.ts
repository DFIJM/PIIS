import { Injectable, HttpService } from '@nestjs/common';
import { Zone } from '../../api/zone/zone';
import { map } from 'rxjs/internal/operators/map';

@Injectable()
export class FoursquareService {
  constructor(private http: HttpService) {}

  private readonly API = 'https://api.foursquare.com/v2/venues/explore';

  private readonly CLIENT_ID = 'YWBCRB3LHLJEXOWRZQUSHGV1TFSEXSWOKM3AJDVJAGXOC5HR';
  private readonly CLIENT_SECRET = 'HGCTXK23LWGRWLXL0AWO1LIN0AWU0HN24SOGRAK3BN2YGOZC';
  private readonly VERSION = 20180604;
  private readonly LIMIT = 10000;

  get(zone: Zone) {
    console.info(`GET: ${this.API} : ${zone.lat},${zone.lng} : ${zone.radius}`);
    return this.http
      .get(this.API, {
        params: {
          client_id: this.CLIENT_ID,
          client_secret: this.CLIENT_SECRET,
          v: this.VERSION,
          ll: `${zone.lat},${zone.lng}`,
          radius: zone.radius,
          limit: this.LIMIT
        }
      })
      .pipe(map(response => response.data.response.groups[0].items))
      .toPromise();
  }
}
