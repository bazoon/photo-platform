run:
	cd ./react-client; HTTPS=true npm run start
srv:
	nodemon srv.js
r: 
	run srv
start:
	pm2 start ./srv.js
stop:
	pm2 stop ./srv.js
restart:
	pm2 restart ./srv.js --watch
kill5000:
	kill -9 "$(lsof -t -i:5000)"
undo:
	git reset --soft HEAD~1
reset:
	git reset --hard HEAD
reload:
	git pull
	make restart
ng-reload:
	sudo systemctl restart nginx
build:
	cd react-client;npm run build

copy:
	find /var/www/fotoregion.site/build  -maxdepth 1 -type f -delete; cp -R /var/www/fotoregion.site/photo-platform/client/dist/client/. /var/www/fotoregion.site/build

all:
	git pull
	make build
	make restart
install:
	cd /var/www/photo-platform/react-client;npm install

.PHONY: lint lintAll build


