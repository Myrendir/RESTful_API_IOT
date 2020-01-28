# shellcheck disable=SC2006
DIR=`date +%m%d%y`

DEST=/db_backups/$DIR

mkdir "$DEST"

mongodump -h cluster0-86rki.mongodb.net -d PasTrack -u DevMyrRoot -p ac43BgpxAvlm2EP9EheX -o "$DEST"
