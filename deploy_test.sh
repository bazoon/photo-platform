cd react-client
npm run build

ssh root@138.124.182.78 "bash -s" << HERE 
  rm -rf /var/www/photo-platform
HERE

ssh root@138.124.182.78 "bash -s" << HERE
  # cd /var/www/photo-platform
  # git pull
  
  git clone https://github.com/bazoon/photo-platform.git /var/www/photo-platform
  cd /var/www/photo-platform
  /root/.nvm/versions/node/v14.17.5/bin/npm i
HERE

scp -r /Users/vn/projects/work/photo-platform/react-client/build root@138.124.182.78:/var/www/photo-platform/react-client
scp -r /Users/vn/projects/work/photo-platform/uploads root@138.124.182.78:/var/www/photo-platform
scp /Users/vn/projects/work/photo-platform/.env_test root@138.124.182.78:/var/www/photo-platform/.env

ssh root@138.124.182.78 "bash -s" << HERE 
  cd /var/www/photo-platform
  pm2 stop srv.js
  pm2 start srv.js
HERE
