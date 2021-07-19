sudo nano ./.ssh/authorized_keys
pwd
curl -sL https://deb.nodesource.com/setup_13.x
curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
sudo apt install -y nodejs
node -v
curl -fsSL https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
sudo apt update
sudo apt install -y mongodb-org
sudo service mongod start
sudo systemctl enable mongod.service 
mongo
sudo apt install -y git
git --version
ssh-keygen -t rsa -b 4096 -C "mister.zyrianovartyom@yandex.ru"
ls
ls -a
cd .ssh
ls
nano id_rsa.pub
ssh-add -l
eval $(ssh-agent -s)
ssh-add ~/.ssh/id_rsa
ssh-add -l
git init
git clone git@github.com:ZArtemA/express-mesto.git
ls
ls -a
rm -r .git
rm -r express-mesto
ls
ls -a
cd ..
pwd
git clone git@github.com:ZArtemA/express-mesto.git
ls
ls -a
git --v
git --version
ls
cd express-mesto/
sudo npm i bcryptj
npm i bcrypt
npm i body-parser
sudo npm i celebrate
sudo npm i cookie-parse
sudo npm i dotenv
sudo npm i express
sudo npm i express-winston
sudo npm i helmet
npm i jsonwebtoken
sudo npm i jsonwebtoken
sudo npm i mongoose
sudo npm i save-dev
sudo npm i validator
sudo npm i winston
nodemon npm i --save-dev nodemon
npm install --save-dev nodemon
npm start 
cd ..
pwd
sudo npm install pm2 -g
cd express-mesto/
pm2 start app.js
pm2 startup
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u artemzyrianov --hp /home/artemzyrianov
pm2 save
pwd
cd..
pwd
cd ..
pwd
sudo apt update
sudo apt install -y nginx
sudo ufw allow 'Nginx Full' OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
sudo systemctl enable --now nginx
sudo nano /etc/nginx/sites-available/default
sudo nginx -t
sudo systemctl reload nginx
git status
pwd
git init
git status
pwd
ls
git mv express-mesto backend
git add -A
cd express-mesto/
ls -a
rm -r .git
cd ..
git add -A
git mv express-mesto backend
ls
git add -A
git commit -m "Сделал бэкенд"
git config --global --list
зцв
pwd
git init
git config --list
git config --global user.name "Zyrianov Artem"
git config --global user.email mister.zyrianovartyom@yandex.ru
git config list
git config --list
git init
git status
git add -A
git status
git commit -m "Сделал бэк"
git git remote -v
git remote -v
git remote
git remote add origin git@github.com:ZArtemA/react-mesto-api-full.git
git remote -v
git status
git commit -u origin master
git commit -u origin main
git branch -m master main
git status
git add -A
ls
git push -u origin main
git pull
git push -u origin main
ls
git pull origin main
pwd
ls
git clone git@github.com:ZArtemA/react-mesto-auth.git
ls
cd react-mesto-auth/
ls -a
rm -r .git
ls -a
cd ..
pwd
ls -a
git add -A
git status
git commit -m "Перенес фронт и бэк на сервер"
git status
git push -u origin main
git pull
See git-pull(1)
git pull
git branch --set-upstream-to=origin
git push -f origin master
git push -f origin main
cd bac
cd backend/
ls
cd ..
git add -A
cd backend/
ls -a
rm -r a
cd ..
git add -A
git commit -m "Убрал лишний файл"
