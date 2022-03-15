<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

Repository de l'application BonApp : Commandez et payez directement depuis votre téléphone au restaurant!

## Pré-requis à l'installation

### Fichiers d'environnement

Pour que l'installation se déroule sans accroc, vous aurez besoin de créer vous-même les fichiers suivants :  
```packages/backend/.env```:

```
JWT_ACCESS_TOKEN_SECRET=VOTRE_CLE_SECRETE
JWT_ACCESS_TOKEN_EXPIRATION_TIME=1500000
JWT_REFRESH_TOKEN_SECRET=UNE_AUTRE_CLE_SECRETE
JWT_REFRESH_TOKEN_EXPIRATION_TIME=1500000
```


Pour mutualiser les url dans le front:  
```packages/frontend/.env```:

```
REACT_APP_URL_BACKEND=http://localhost:4000
REACT_APP_SOCKET_BACKEND=ws://localhost:4000
```



```/.env```:

```
NODE_ENV=development

FRONTEND_PORT=3000
BACKEND_PORT=4000

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

CLIENT_ORIGIN=http://127.0.0.1:8888
CLIENT_API_BASE_URL=http://127.0.0.1:6868/api

REACT_LOCAL_PORT=8888
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
# Make (recommandé)
$ make local 

# NPM
$ npm install
```

Concernant l'installation de l'application, la stack étant exclusivement en Javascript, rendez-vous dans les dossiers
```packages/backend``` ainsi que ```packages/frontend``` pour y exécuter ```npm install```.

## Lancer l'application

```bash
# En local
$ make local # Cette commande supprime les anciennes instances du projet et le rebuild.

# docker-compose (building is optional)
$ docker-compose up --build -d # Sans supression des anciennes instances.

#### NPM ####
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Générer les fixtures

(Après avoir installé nos packages backend)

``` npm run seed:run```

Pour drop la base de données:

```bash
$ npm run schema:drop # Créer le drop sans l'execution
$ npm run schema:sync #Push de la suppression à la bdd

$ npm run schema:kill #Celle ci execute les deux précedente en meme temps
```

## Test (à implémenter)

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## Schema base de donnée
![alt text](./bdd_bonApp.jpeg)
