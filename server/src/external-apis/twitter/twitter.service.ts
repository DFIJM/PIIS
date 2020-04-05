import { Injectable } from '@nestjs/common';
import * as Twit from 'twit';
import { Zone } from '../../api/zone/zone';

@Injectable()
export class TwitterService {
  private readonly TWITTER = new Twit({
    consumer_key: 'eP3QRLvHznF8ai03y2c0U69zO',
    consumer_secret: 'wz59GZvZhdUYjCfRdDrOUmp57NcDRqOxTBoJmx6xdrEuCEhn6r',
    access_token: '54179272-iHJnWvWSqGFkIMU1z9n9ULSf21DH3R8ON8QxwO5kj',
    access_token_secret: 'qNkR88nMd1PJVCTClaimMTMSqQCl31JkNgenqnyWLG2Ww'
  });

  /* get(zone: Zone) {
    const stream = this.TWITTER.stream('statuses/filter', { locations: '' });

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
  } */

  init(): void {
    // Al iniciar el servidor se llamará a esta función para que reanude la recopilación
    // Deberá consultar todas las zonas que estén "playing=true" y llamar a "play" para cada una
    // Si da error se deberá poner la zona como "playing=false" y controlar todo error para que el servidor inicie siempre
  }

  create(zone: Zone): Promise<void> {
    // Crear registro en mongodb
    // Crear identificador único para asignarlo a la zona
    // Crear stream para escuchar twits
    // Escuchar twits ("play" por defecto)
    // actualizar mongodb con el valor de "playing"
    return Promise.resolve();
  }

  play(zone: Zone): Promise<void> {
    // escuchar stream
    // actualizar mongodb con el valor de "playing"
    return Promise.resolve();
  }

  stop(zone: Zone): Promise<void> {
    // pausar stream
    // actualizar mongodb con el valor de "playing"
    return Promise.resolve();
  }

  info(zone: Zone): Promise<any> {
    // información sobre la zona, a modo de ejemplo: top users, etc.
    // lanzar error si no hay datos
    return Promise.resolve({ top: ['a', 'b', 'c'] });
  }
}
