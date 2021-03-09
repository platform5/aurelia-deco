DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "$DIR"
echo "Moving directory to aurelia-resources plugin"
cd ../
cd aurelia-resources
# READ LAST COMMIT HASH
read -r hash<.git/refs/heads/master
echo "Latest aurelia-resources git hash: $hash"
echo "Moving directory to aurelia-deco plugin"
cd ../aurelia-deco
echo "Updating package.json with latest git hash of aurelia-resources"
search='("aurelia-resources": ")(.*)#([a-z0-9]*)(")'
replace="\1\2#${hash}\4"
if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i "" -E "s/${search}/${replace}/g" "package.json"
else
  sed -i -E "s/${search}/${replace}/g" "package.json"
fi
sleep 1
git add package.json package-lock.json
git commit -m "Bump aurelia-resources dependency"
git push origin
bash ../aurelia-shop/get-last-deco.sh
bash ../aurelia-three/get-last-deco.sh