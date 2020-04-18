cd /home/ubuntu/
pm2 delete piis
rm -rf piis-server
mkdir piis-server
mv build.zip piis-server/
cd piis-server
unzip -qq build.zip
rm -rf build.zip
mv build/* .
rm -rf build
nvm use 12.16.1
NODE_ENV=prod pm2 start main.js --name piis --max-memory-restart 200M --time
pm2 save
exit
