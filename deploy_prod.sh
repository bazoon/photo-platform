cd react-client
npm run build

ssh root@185.65.202.124 "bash -s" << HERE
  cd /var/www/photo-platform
  git pull https://github.com/bazoon/photo-platform master
HERE

scp -r /Users/vn/projects/work/photo-platform/react-client/build root@185.65.202.124:/var/www/photo-platform/react-client
# scp -r /Users/vn/projects/work/photo-platform/react-client/public root@185.65.202.124:/var/www/photo-platform/react-client



# scp /Users/vn/projects/work/photo-platform/.env_test root@138.124.182.78:/var/www/photo-platform/.env
ssh root@185.65.202.124 "bash -s" << HERE 
  cd /var/www/photo-platform
  pm2 stop srv.js
  pm2 start srv.js
  service nginx restart
HERE
