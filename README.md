ctnr +shft+ p  -vs setting
Просто есть разница между Ctrl+K+F и Ctrl+K Ctrl+F.

npm i debug  //  https://www.npmjs.com/package/debug      process.env.DEBUG = '*'; 
process.env.DEBUG = 'express:router:layer  express:router'; 
//----------------------
npm install -g typescript   //https://www.typescriptlang.org/   

https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html
//-----------сборщики HTML
npm i pug    //https://www.npmjs.com/package/pug  //https://pugjs.org/api/getting-started.html

npm install ejs https://ejs.co/

//https://mustache.github.io/
//------------------jwt-----------------------
npm i jsonwebtoken   https://www.npmjs.com/package/jsonwebtoken
//----------------------------npm i joi
// проверяет если те данные у нас ,что пришли от клиента  в req.query
npm i joi   //https://www.npmjs.com/package/joi   //https://joi.dev/api/?v=17.3.0
npm i @hapi/joi //https://www.npmjs.com/package/@hapi/joi

///---------------------------npm i dotenv
вытаскивает данные из паточного файла и в ставляет эти данные в глобальные  process.env
npm i dotenv     //https://www.npmjs.com/package/dotenv

//--------------CORS----------- 
//https://developer.mozilla.org/ru/docs/Web/HTTP/CORS
npm i cors   //https://www.npmjs.com/package/cors

//-------------------------
npm i nodemon   -следит за обновление и обновляет
npm i flags     --https://github.com/dpup/node-flags

//---------------------------------------node-fetch---------
npm i node-fetch //https://www.npmjs.com/package/node-fetch

//--------------------------------------------------
npm i express  --https://www.npmjs.com/package/express http://expressjs.com/ru/
npm i express-handlebars  https://www.npmjs.com/package/express-handlebars   //https://medium.com/devschacht/node-hero-chapter-4-c2ebcd12565c

npm i esm   https://www.npmjs.com/package/esm

npm install body-parser   --http://expressjs.com/en/resources/middleware/body-parser.html

npm i cors https://www.npmjs.com/package/cors
//-----------------------Cloud-------------------
https://console.cloud.google.com/
npm i @google-cloud/storage  https://www.npmjs.com/package/@google-cloud/storage   

//----------------------- REST
https://restfulapi.net/


npm i prettier   https://www.npmjs.com/package/prettier


npm install -g install-peerdeps
npm install eslint-config-prettier eslint-plugin-prettier prettier lint-staged husky --save-dev  //https://maxpfrontend.ru/vebinary/nastroyka-eslint-prettier-pre-commit-hook-create-react-app-visual-studio-code/
npm i eslint-config-airbnb  -- https://www.npmjs.com/package/eslint-config-airbnb  //https://eslint.org/docs/user-guide/configuring

https://github.com/sindresorhus/awesome-nodejs  популярные библиотеки                                                   
------------------------Чтиво
//https://medium.com/devschacht/node-hero-chapter-4-c2ebcd12565c
https://medium.com/devschacht/node-hero-chapter-5-dd79607858f2  ------- создание сервера 

// ------------------deploy  server on other domains---
Запускаем команду/терминал: 
1 шаг
ssh  root@NameDomain@.com   потом водим пароль и  подсоединяемся к серверу

ssh  root@NameDomain@.com  -i ~/путь до shh key - подсоединяемся к серверу

//работает на ubuntu
1.1 шаг
команды которые используются на подключено сервере :
ls                              - проверить время добавления и какие файлы есть
ls -la                          - какие есть файлы и когда созданы
ls -a                           - какие файлы есть в папке
rm -rf  (имя)                   - удаляет папку или файл
touch (имя файла)               - создает файл
mkdir  (имя папки)              - создаст папку
screen -S  (имя файла)          - открывает терминал на удалённой машине и присваиваем имя screen
screen -S(имя screen)(имя файла)- открывает терминал на удалённой машине на тот фале ,что мы указали  и присваиваем имя screen
screen -list                    - показывает список запущенных терминалов 
screen -r (имя файла)           - переходит в запущенный терминал

screen -dmS (имя screen)(имя файла)  
Ключ -d                         - укажет, что скрин нужно свернуть,
ключ -m                         - что его нужно для начала создать
Ctrl + C                        - остановить работу screen 
exit                            - полностью закрывает screen
2 шаг   
стягиваем наш проект и git 
sudo                            - данная команда используется если не хватает прав 
sudo git clone имя репозитория  - стягиваем файл с репозитория 
sudo git pull                   - подтягиваем изменения с git 
cd  (имя папки)                 - переходим в файл 
sudo npm -i                     - устанавливаем пакеты из package.json на сервере 

3 шаг 
создаём фал 
sudo nano   .env  -  создаём файл  для прослушивания  нужного порта 

3.1
добавляем в файл такие параметры/строки
PORT=80    суда указывается открытый порт 
сохраняем 

3.2
Запускаем  сервер 
sudo node api/start  - в данном файле лежит файл для запуска сервера что мы сделали ранние при разработке сервера 

4
запуск сервера чтобы работал в автономном режиме 
открывается терминал на удалённой машине  который не закрывается когда мы выходим с своего терминала на пк
screen -S  имя     - запускает в автономном режиме файл 

4.1 открывается окно
делаем шаг 3.2

4.2 - не обязательно делать
переходим в скрин 
screen -r имя файла   - заходим на запущенный терминал 

производим отсоединения от screen  в который зашли 
Ctrl + A  - переведет screen в командный режим
Ctrl + D
вернулись в терминал на который мы подключились к серверу 

5 
Установить  npm пакет для перезапуска сервера если упадёт 
npm i forever      https://www.npmjs.com/package/forever

//-------------Запуск сервера через pm2 
npm install pm2 -g https://pm2.keymetrics.io/  
