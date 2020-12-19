
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



.PHONY: lint lintAll


