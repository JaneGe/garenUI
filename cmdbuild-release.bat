del node_modules\.bin\ng.cmd
copy __ng.cmd node_modules\.bin\ng.cmd

cd node_modules\.bin

ng build --env=release --prod --output-hashing=all  --extract-licenses=false

cd ..\..

pause
