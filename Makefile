
start:
	pm2 start ./server.js
stop:
	pm2 stop ./server.js
restart:
	pm2 restart ./server.js
kill5000:
	kill -9 "$(lsof -t -i:5000)"
undo:
	git reset --soft HEAD~1
reset:
	git reset --hard
reload:
	git pull
	make restart
ng-reload:
	sudo systemctl restart nginx
copy:
	rm -rf /var/www/fotoregion.site/build
	cp -R /var/www/fotoregion.site/photo-platform/client/dist/client /var/www/fotoregion.site/build


.PHONY: lint lintAll


