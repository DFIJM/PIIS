import { Injectable, HttpService, InternalServerErrorException } from '@nestjs/common';
import { Zone } from '../../api/zone/zone';
import { map } from 'rxjs/internal/operators/map';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class FoursquareService {
  constructor(private http: HttpService, @InjectModel('Zone') private zoneModel: Model<Zone>) {}

  private readonly API = 'https://api.foursquare.com/v2/venues/explore';
  private readonly CLIENT_ID = 'YWBCRB3LHLJEXOWRZQUSHGV1TFSEXSWOKM3AJDVJAGXOC5HR';
  private readonly CLIENT_SECRET = 'HGCTXK23LWGRWLXL0AWO1LIN0AWU0HN24SOGRAK3BN2YGOZC';
  private readonly VERSION = 20180604;
  private readonly LIMIT = 100;

  private query(data): Promise<any> {
    return this.http
      .get(this.API, {
        params: {
          client_id: this.CLIENT_ID,
          client_secret: this.CLIENT_SECRET,
          v: this.VERSION,
          ll: `${data.options.center.lat},${data.options.center.lng}`,
          radius: data.options.radius,
          limit: this.LIMIT
        }
      })
      .toPromise();
  }

  private parseData(response: any, simple: boolean = false): { geo?: any[]; categories: any[]; count: number } {
    let geo = [];
    let categoriesMap = {};
    let categories = [];
    let count = 0; // Número de negocios (No tipos de negocios)
    for (let group of response.groups) {
      for (let item of group.items) {
        let icon = item.venue.categories[0].icon;
        if (!simple) {
          geo.push({
            position: { lat: item.venue.location.lat, lng: item.venue.location.lng },
            icon: icon.prefix + 'bg_32' + icon.suffix,
            name: item.venue.name,
            category: item.venue.categories[0].name,
            address: item.venue.location.address
          });
        }
        count += item.venue.categories.length;
        for (let category of item.venue.categories) {
          if (categoriesMap[category.name]) {
            categoriesMap[category.name].count++;
          } else {
            categoriesMap[category.name] = {
              name: category.name,
              icon: category.icon.prefix + (simple ? '32' : 'bg_32') + category.icon.suffix,
              count: 1
            };
          }
        }
      }
    }
    categories = Object.values(categoriesMap);
    categories.sort((a, b) => (a.count > b.count ? -1 : b.count > a.count ? 1 : 0));

    if (simple) {
      return { categories, count };
    }
    return { geo, categories, count };
  }

  async get(name: string): Promise<any> {
    let zone = await this.zoneModel.findOne({ name }).exec();
    let data;
    for (let drawing of zone.drawings) {
      if (drawing.api === 'foursquare') {
        data = drawing;
      }
    }
    if (!data) {
      throw new InternalServerErrorException('No hay ninguna zona para FourSquare');
    }
    return this.query(data).then(({ data: { response } }) => this.parseData(response));
  }

  async info(name: string): Promise<any> {
    let zone = await this.zoneModel.findOne({ name }).exec();
    let data;
    for (let drawing of zone.drawings) {
      if (drawing.api === 'foursquare') {
        data = drawing;
      }
    }
    if (!data) {
      return [];
    }
    return this.query(data).then(({ data: { response } }) => this.parseData(response, true));
  }
}
