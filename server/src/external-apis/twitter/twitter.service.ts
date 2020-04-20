import { Injectable } from '@nestjs/common';
import * as Twit from 'twit';
import { Zone } from '../../api/zone/zone';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TwitterService {
  constructor(
    @InjectModel('Zone') private zoneModel: Model<Zone>,
    @InjectModel('Tweet') private tweetModel: Model<any>
  ) {}
  private readonly TWITTER = new Twit({
    consumer_key: 'eP3QRLvHznF8ai03y2c0U69zO',
    consumer_secret: 'wz59GZvZhdUYjCfRdDrOUmp57NcDRqOxTBoJmx6xdrEuCEhn6r',
    access_token: '54179272-iHJnWvWSqGFkIMU1z9n9ULSf21DH3R8ON8QxwO5kj',
    access_token_secret: 'qNkR88nMd1PJVCTClaimMTMSqQCl31JkNgenqnyWLG2Ww'
  });

  private streamingsPlaying = {};

  async init(): Promise<void> {
    let zones = await this.zoneModel.find({ playing: true }).exec();
    for (let zone of zones) {
      this.play(zone.name);
    }
  }

  async play(name: string): Promise<void> {
    if (this.streamingsPlaying[name]) {
      return; // Saltamos si ya se está consultando
    }
    let zone = await this.zoneModel.findOne({ name });
    for (let drawing of zone.drawings) {
      if (drawing.api === 'twitter') {
        await this.createStreaming(name, drawing.options.bounds);
        zone.playing = true;
        zone.save();
        return;
      }
    }
    // Si llega aquí es que no se ha encontrado un drawing.api de "twitter"
    throw new Error('Zona asignada a la API de Twitter no encontrada');
  }

  async stop(name: string): Promise<void> {
    if (!this.streamingsPlaying[name]) {
      return; // Saltamos si no se está consultando
    }
    let zone = await this.zoneModel.findOne({ name });
    for (let drawing of zone.drawings) {
      if (drawing.api === 'twitter') {
        this.streamingsPlaying[name].stop();
        delete this.streamingsPlaying[name];
        zone.playing = false;
        zone.save();
        return;
      }
    }
    // Si llega aquí es que no se ha encontrado un drawing.api de "twitter"
    throw new Error('Zona asignada a la API de Twitter no encontrada');
  }

  async info(name: string): Promise<any> {
    return {
      tweets: await this.tweetModel.countDocuments({ zone: name }).exec(),
      topUsers: await this.tweetModel
        .aggregate([
          { $match: { zone: name } },
          { $unwind: '$user' },
          { $group: { _id: '$user.id', name: { $first: '$user.screen_name' }, count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 5 }
        ])
        .exec(),
      users: (await this.tweetModel
        .aggregate([
          { $match: { zone: name } },
          { $unwind: '$user' },
          { $group: { _id: '$user.id' } },
          { $group: { _id: null, count: { $sum: 1 } } }
        ])
        .exec())[0]?.count
    };
  }

  async remove(name: string): Promise<any> {
    return this.tweetModel.deleteMany({ zone: name }).exec();
  }

  private createStreaming(name, bounds) {
    this.streamingsPlaying[name] = this.TWITTER.stream('statuses/filter', { locations: this.boundsToLocation(bounds) });
    this.streamingsPlaying[name].on('tweet', tweet => {
      tweet.zone = name;
      this.tweetModel.create(tweet);
    });
  }

  private boundsToLocation(bounds: any[]) {
    return [bounds[2].lat, bounds[2].lng, bounds[0].lat, bounds[0].lng].map(coord => coord.toString());
  }
}
