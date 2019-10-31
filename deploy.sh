#/bin/bash

echo "Building ..."
npm run build &&
tar zcvf build.tgz build &&
echo "Deploying ..."
ssh emi420@45.79.107.30 "rm -rf /var/www/bomberoslagranja.org/map/*" &&
scp build.tgz emi420@45.79.107.30:/var/www/bomberoslagranja.org/map &&
ssh emi420@45.79.107.30 "cd /var/www/bomberoslagranja.org/map/ && tar zxvf build.tgz && mv ./build/* . && rm ./build.tgz && rm -rf ./build" &&
echo "Cleaning ..."
rm build.tgz
echo "Done."
