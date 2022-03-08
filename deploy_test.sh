cd react-client
npm run build

# ssh root@138.124.182.78 "bash -s" << HERE 
#   cp -r /var/www/photo-platform/uploads /var/www/temp-uploads 
#   rm -rf /var/www/photo-platform
# HERE

ssh root@138.124.182.78 "bash -s" << HERE
  cd /var/www/photo-platform
  git pull
  # git clone https://github.com/bazoon/photo-platform.git /var/www/photo-platform
  # cd /var/www/photo-platform
  # /root/.nvm/versions/node/v14.17.5/bin/npm i
HERE

scp -r /Users/vn/projects/work/photo-platform/react-client/build root@138.124.182.78:/var/www/photo-platform/react-client
# scp -r /Users/vn/projects/work/photo-platform/uploads/foto.ru root@138.124.182.78:/var/www/photo-platform/jstest.space
# scp /Users/vn/projects/work/photo-platform/.env_test root@138.124.182.78:/var/www/photo-platform/.env

ssh root@138.124.182.78 "bash -s" << HERE 
  cd /var/www/photo-platform
  pm2 stop srv.js
  pm2 start srv.js
HERE

# scp -r root@185.65.202.124:/var/www/photo-platform/uploads /Users/vn/projects/temp/


# ssh root@138.124.182.78 "bash -s" << HERE
  # cd /var/www/photo-platform
  # mkdir uploads
  # mkdir uploads/jstest.space
  # cp -r /var/www/temp-uploads /var/www/photo-platform/uploads 
# HERE


# scp -r /Users/vn/projects/temp/uploads/*.* root@138.124.182.78:/var/www/photo-platform/uploads/jstest.space
