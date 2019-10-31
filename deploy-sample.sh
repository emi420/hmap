#/bin/bash

echo "Building ..."
npm run build &&
tar zcvf build.tgz build &&
echo "Deploying ..."
ssh <user>@<ip> "rm -rf <project-folder>/*" &&
scp build.tgz <user>@<ip>:<project-folder> &&
ssh <user>@<ip> "cd <project-folder> && tar zxvf build.tgz && mv ./build/* . && rm ./build.tgz && rm -rf ./build" &&
echo "Cleaning ..."
rm build.tgz
echo "Done."

