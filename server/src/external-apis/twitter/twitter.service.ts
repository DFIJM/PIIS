import { Injectable } from '@nestjs/common';
import * as Twit from 'twit';

@Injectable()
export class TwitterService {
  private readonly TWITTER = new Twit({
    consumer_key: 'eP3QRLvHznF8ai03y2c0U69zO',
    consumer_secret: 'wz59GZvZhdUYjCfRdDrOUmp57NcDRqOxTBoJmx6xdrEuCEhn6r',
    access_token: '54179272-iHJnWvWSqGFkIMU1z9n9ULSf21DH3R8ON8QxwO5kj',
    access_token_secret: 'qNkR88nMd1PJVCTClaimMTMSqQCl31JkNgenqnyWLG2Ww'
  });

  get(/* zone: Zone */) {
    const stream = this.TWITTER.stream('statuses/filter' /* , { locations: '' } */);

    stream.on('tweet', function(tweet) {
      console.log('tweet');
      console.log(tweet);
    });
    stream.on('warning', function(warning) {
      console.log('warning');
      console.log(warning);
    });
    stream.on('disconnect', function(disconnectMessage) {
      console.log('disconnectMessage');
      console.log(disconnectMessage);
    });
  }
}
