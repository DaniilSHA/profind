# Использованный стек технологий и библиотек:

## FRONTEND

### - HTML, CSS, REACT, TypeScript

### - Redux, Formik, ReactRouterDom v.6

## BACKEND

### - JAVA17, SPRING BOOT, JPA, POSTGRES 15

# Описание проекта:

### 1. Основная идея проекта: образование связи путем предоставления контактов друг друга между двумя пользователями по их целям в случае, если они подходят друг другу (match).

### 2. Цели и связи: TEACHER -> STUDENT; STUDENT -> TEACHER; INVESTOR -> STARTUP-BOSS; STARTUP-BOSS -> INVESTOR; STARTUP-PLAYER <-> STARTUP-PLAYER; 

### 3. Реализована авторизация через jwt-token.

### 4. BACKEND MS-AUTH - микросервис для авторизации: регистрирует и авторизовывает пользователей, выписывает им jwt токены, валидирует и обновляет их.

### 5. BACKEND MS-CORE - микросервис: реализует основную идею проекта - создает анкеты, prematch и match сущности между двумя пользователями.

### 6. FRONTEND: 

#### 6.1 Main - основная часть. Страница на которую попадают не авторизированные пользователи. На ней кратко описано то, чем занимается компания + про каждую роль.

#### 6.2 Login и Registration - модальные окна регистрации и логина, Logout - кнопка для разлогина.

#### 6.3 Find - место, где человеку предоставляются подходящие для него анкеты. По центру просто анкета без контактов и лайк/дизлайк - в дальнейшем после лайка/дизлайка человек попадет в prematch.

#### 6.4 Prematches - место, где человек может посмотреть, кто его лайкнул и ответить взаимностью либо отвергнуть (кнопка prematch), либо перейти в matches, где ему выведется список людей, с которым у него совпадение по лайкам и далее будет кнопка ("открыть контакты" или "просмотреть анкету").

#### 6.5 Profile - место, где человек либо настраивает свой профиль.

#### 6.6 Moderation - место, где модератор валидирует анкеты

# BUILD

### 1. Запуск backend серверов - в папке build в rood dir, находятся jar файлы с микросервисами (ms-auth (порт: 8080), ms-core (порт: 8081)) для запуска приложения под java 17. Можно запустить из командной строки или воспользоваться соответствующими bat файлами, в текущей директории, прописав в них путь до java 17 в своей файловой системе.  

### 2. Запуск бд postgres - необходимо скачать и установить postgres 15 с настройками по умолчанию: port 5432, user: postgres, psw: google. Перед запуска обязательно создать в бд базу с навеванием "profind". В случае использования свойх настроек, необходимо в папке build в файле application.yaml прописать следующие настройки соединения с бд: - spring.datasource.url: jdbc:postgresql://localhost:5432/profind; spring.datasource.username: postgres; spring.datasource.password: google;   

### 3. Запуск frontend - для запуска необходимо установить node js версии 18.17.1. Дла в терминале перейти в папку frontend (cd ./frontend) и в ней прописать команду (npm start)

###<hr>

# Author by: <br> Shakhmovedev Marat Andreevich - frontend, <br> Shakhmovedev Daniil Andreevich - backend