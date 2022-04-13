<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

Repository de l'application BonApp : Commandez et payez directement depuis votre téléphone au restaurant!

## Pré-requis à l'installation

### Fichiers d'environnement

Pour que l'installation se déroule sans accroc, vous aurez besoin de créer vous-même les fichiers suivants :  
```packages/backend/.env```:

```
JWT_ACCESS_TOKEN_SECRET=VOTRE-CLE-SECRETE
JWT_ACCESS_TOKEN_EXPIRATION_TIME=10000
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

# Launch local up
$ make local-up

# Launch prod build and up
$ make prod-build

# Launch prod up
$ make prod-up

# YARN
$ yarn install
```

Concernant l'installation de l'application, la stack étant exclusivement en Javascript, rendez-vous dans les dossiers
```packages/backend``` ainsi que ```packages/frontend``` pour y exécuter ```yarn install```.

## Lancer l'application

```bash
# En local
$ make local # Cette commande supprime les anciennes instances du projet et le rebuild.

# docker-compose (building is optional)
$ docker-compose up --build -d # Sans supression des anciennes instances.

#### YARN ####
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

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
