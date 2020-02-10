@echo off

REM move into the backups directory
REM CD C:\database_backups

REM Create a file name for the database output which contains the date and time. Replace any characters which might cause an issue.
set filename=PasTrack %date% %time%
set filename=%filename:/=-%
set filename=%filename: =__%
set filename=%filename:.=_%
set filename=%filename::=-%

REM Export the database

echo Running backup "%filename%"

C:\Program Files\MongoDB\Server\4.2\bin\mongodump --out %filename%

REM ZIP the backup directory
echo Running backup "%filename%"

"c:\Program Files\7-Zip\7z.exe" a -tzip "%filename%.zip" "%filename%"

REM Delete the backup directory (leave the ZIP file). The /q tag makes sure we don't get prompted for questions 
echo Deleting original backup directory "%filename%"
rmdir "%filename%" /s /q

echo BACKUP COMPLETE
