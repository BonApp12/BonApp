<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

Repository de l'application BonApp : Commandez et payez directement depuis votre téléphone au restaurant!

## Pré-requis à l'installation

### Fichiers d'environnement

Pour que l'installation se déroule sans accroc, vous aurez besoin de créer vous-même les fichiers suivants :  
```packages/backend/.env```:

```
JWT_ACCESS_TOKEN_SECRET=VOTRE_SECRET_JWT
#2,7 heures
JWT_ACCESS_TOKEN_EXPIRATION_TIME_WEB=10000
#18 heures
JWT_ACCESS_TOKEN_EXPIRATION_TIME_MOBILE=64800

URL_API_BACKEND=http://localhost:4000
URL_FRONTEND=http://localhost:3000
URL_FRONTMANAGER=http://localhost:3001

# mail
MAIL_HOST=smtp.gmail.com
MAIL_USER=VOTRE_USER_MAIL
MAIL_PASSWORD=VOTRE_PASSWORD_MAIL
MAIL_FROM=noreply@bon-app.fr

# GOOGLE OAUTH
GOOGLE_CLIENT_ID=VOTRE_CLIENT_ID
GOOGLE_SECRET=VOTRE_SECRET_GOOGLE
GOOGLE_REDIRECT_URI=http://localhost:4000/google/redirect
```


Pour mutualiser les url dans le front:  

```packages/frontend/.env```:

```
REACT_APP_URL_BACKEND=http://localhost:4000
REACT_APP_SOCKET_BACKEND=ws://localhost:4000
REACT_APP_GOOGLE_AUTH_CLIENT_ID=VOTRE_CLIENT_ID
```



```/.env```:

```
NODE_ENV=development

REACT_PORT=3000
BACKEND_PORT=4000

FRONTEND_MANAGER_PORT=3001

JWT_SECRET=jwt_secret_key
JWT_EXPIRES_IN=30d

DB_HOST=bp-pg-db
DB_NAME=bp-pg-db
DB_USER=postgres
DB_PASSWORD=root
DB_PORT=5432

PGADMIN_DEFAULT_EMAIL=admin@backend.com
PGADMIN_DEFAULT_PASSWORD=pass@123
PGADMIN_PORT=5055

DB_URL=postgres://postgres:root@bp-pg-db:5432/bp-pg-db
ENTITY_PATH=dist/**/**/*.entity{.js,.ts}

NODE_LOCAL_PORT=6868
NODE_DOCKER_PORT=8080

CLIENT_ORIGIN=http://127.0.0.1:8888
CLIENT_API_BASE_URL=http://127.0.0.1:6868/api

REACT_PROD_PORT_MANAGER=8888
REACT_PROD_PORT=8081

REACT_DOCKER_PORT=80
```

Dans le cadre du développement, essayez de garder au maximum les mêmes valeurs, exception faite pour les clés
secrètes.  
Si vous souhaitez changer les ports ou encore les noms de la base de données, faites concorder avec le docker-compose.

### Base de données

Avant d'exécuter les commandes ci-dessous, rendez-vous dans le fichier ```packages/backend/ormconfig.js```
et passez la propriété suivante à ```true``` :

```javascript
synchronize: false // True
```

Rappel : Une fois que la base de données est initialisée, repasser ce paramètre à false pour éviter qu'elle soit écrasée
à chaque redémarrage du Docker.

## Installation

```bash
# Launch local build and up
$ make local-build 

# Launch prod build and up
$ make prod-build

# YARN
$ yarn install
```

Concernant l'installation de l'application, la stack étant exclusivement en Javascript, rendez-vous dans les dossiers
```packages/backend``` ainsi que ```packages/frontend``` pour y exécuter ```yarn install```.

## Lancer l'application

```bash
# In local
$ make local-build # this command build and launch the project

# or to launch the project only 
$ make local-up

#In Prod
$ make prod-build # this command build and launch the project

# or to launch the project only 
$ make prod-up

#### YARN ####
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

### Lancer l'application mobile
Après avoir fait les installations, il suffit de se rendre directement sur le lien : ```localhost:19006```

**_NOTE_** :
- Renseigner et remplir les fichiers .env (backend, frontend et racine)
- Mettre l'option **synchronise** a TRUE dans le fichier ```ormconfig.js``` situé dans le dossier ```packages/backend```.
- Lancer les fixtures qu'on explique juste après.


## Générer les fixtures

(Après avoir installé nos packages backend)

``` yarn run seed:run```

Pour drop la base de données:

```bash
$ yarn run schema:drop # Créer le drop sans l'execution
$ yarn run schema:sync #Push de la suppression à la bdd

$ yarn run schema:kill #Celle ci execute les deux précedente en meme temps
```

## Test (à implémenter)

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
## Schema base de donnée
![alt text](./bdd_bonApp.jpeg)
