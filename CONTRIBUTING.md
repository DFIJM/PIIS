# CONTRIBUTING

## Instalación

1. [Instalar Visual Studio Code](https://code.visualstudio.com/)
2. [Instalar NVM - Node Version Manager](https://github.com/nvm-sh/nvm)
3. Instalar NodeJS v12.16.1

   `nvm install 12.16.1`

4. `git clone https://github.com/DFIJM/PIIS.git`
5. Instalar dependencias

```sh
cd client
nvm use
npm i
```

```sh
cd server
nvm use
npm i
```

## Arranque

Para arrancar tanto el cliente como el servidor se puede escribir el siguiente comando. Para más información leer el README.md de `./client` o `./server`

```sh
npm start
```

## Google Maps API

<https://storage.googleapis.com/js-samples/master/public/index.html>

## MongoDB

URL: lorkiano.ddns.net:27017
USER: piis20
PASS: Uc@m.2020
DBNAME: piis

## Subida a producción

Hay que ejecutar el archivo deploy.sh. Solo en sistemas Linux.
Este archivo se encarga de crear todos los archivos necesarios, empaquetarlos y subirlos al servidor de producción.
Una vez transferidos, reiniciará el servidor y aplicará los cambios.

Es necesario instalar PM2 en el servidor de producción.
<https://pm2.keymetrics.io/>
