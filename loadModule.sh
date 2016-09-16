# This script scrapes NUSMODS for their modules

YEAR="2016-2017"
SEM="1"

wget -r -l1 --no-parent --reject "index.html*" -A "*.json" http://api.nusmods.com/$YEAR/$SEM/modules/
cd api.nusmods.com/$YEAR/$SEM/modules # IMPORTANT. If not it'll delete all your files.
# rm -r -- */ # This removes all folders, since only need json files. Removed because too dangerous.
cd ../../../../
node loadModuleIntoSqlite.js $YEAR $SEM