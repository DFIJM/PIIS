echo "Construyendo cliente..."
cd client
npm run build
cd ..

echo ""
echo "Construyendo servidor..."
cd server
npm run build
cd ..

echo ""
echo "Empaquetando todo..."
rm -rf build
rm -rf build.zip
mkdir build
mkdir build/public
mv server/dist/* build/
rm -rf server/dist
mv client/dist/* build/public/
rm -rf client/dist
cp -r server/src/ssl build

echo ""
echo "Instalando dependencias..."
cp server/package.json build
cd build
npm i --production
cd ..

echo ""
echo "Comprimiendo..."
zip -r -qq build.zip build/*
rm -rf build/

echo ""
echo "Archivo build.zip creado"

echo ""
echo "Subiendo archivos..."
sshpass -p 'P@ssw0rd' scp build.zip ubuntu@lorkiano.ddns.net:/home/ubuntu
rm -rf build.zip

echo ""
echo "Actualizando servidor..."
cat deploy-remote.sh | sshpass -p 'P@ssw0rd' ssh -tt ubuntu@lorkiano.ddns.net

echo ""
echo "Actualización finalizada"
