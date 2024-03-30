# Rezepte Netzwerk Backend

Diese Dokumentation dient als Hilfestellung für die Einrichtung und Installation des Backend-Servers für das Rezepte Netzwerk.

## Installation

### 1. Repository klonen

#### 1.1 Ordner auswählen und cmd öffnen
HTTPS-Variante: 

```
git clone https://git.ai.fh-erfurt.de/rezepte-netzwerk/rezepte-netzwerk-backend.git
```

SSH-Variante: 

```
git clone git@git.ai.fh-erfurt.de:rezepte-netzwerk/rezepte-netzwerk-backend.git
```

### Alternative: 1. Git initialisieren und Remote-Branch hinzufügen

#### 1.1 Projektordner erstellen und cmd öffnen

```
git init
git remote add origin https://git.ai.fh-erfurt.de/rezepte-netzwerk/rezepte-netzwerk-backend.git
git pull origin main
```

### 2. Pakete installieren

Bitte führen Sie zur Installation der Pakete den folgenden Befehl aus: ```npm install```

### 3. Datenbank

Wenn Sie keinen Zugriff auf unsere MongoDB-Datenbank haben, kontaktieren Sie uns bitte, damit wir Sie einladen können. Zugriff wurde bereits für Herrn Petermann gewährt.

Wenn Sie Zugriff auf unsere MongoDB haben, müssen Sie nichts weiter tun. Sie können den Server starten und problemlos mit den Daten über Postman oder das Frontend arbeiten. Sie können die Daten auch jederzeit unter folgendem Link anzeigen und bei Bedarf bearbeiten: [MongoDB Cloud](https://cloud.mongodb.com/v2/654bc71a622923799f383ba3#/clusters/detail/RezepteNetzwerk)


### 4. Starten des Servers

Bitte führen Sie zum Starten des Servers den folgenden Befehl aus: ```npm start```

Der Server ist nun unter der Adresse ```http://localhost:8080/``` erreichbar.

## Verfügbare Endpoints

Folgende Endpoints können im Postman abgerufen werden:

### Authentication

Funktion | Variante | Pfad | Erforderliche Parameter  | Rückgabe 
--- | --- | --- | --- | ---
Login | POST | http://localhost:8080/auth/login |email, password | User
Register | POST | http://localhost:8080/auth/register | email, password, username | User

### User

Funktion | Variante | Pfad | Erforderliche Parameter  | Rückgabe 
--- |--- | --- | --- | ---
GetAll | GET    | http://localhost:8080/users | - | Users
GetOne | GET    | http://localhost:8080/users/:id | - | User
Delete | DELETE | http://localhost:8080/users/:id | - | User
Update | POST   | http://localhost:8080/users/:id | email, password, username | User

### Recipes

Funktion | Variante | Pfad | Erforderliche Parameter  | Rückgabe 
--- |--- | --- | --- | ---
getAllRecipes      | GET | http://localhost:8080/recipes | - | Recipes
getAllOwnerRecipes | GET | http://localhost:8080/recipes/owner/:ownerId | - | Recipes
getRecipe          | GET | http://localhost:8080/recipes/:id | - | Recipe
getCategoryRecipes | GET | http://localhost:8080/recipes/category/:category | - | Recipes
createNewRecipe    | POST | http://localhost:8080/recipes/create | title, description, imageURL, prepTime, servings, ingredients, steps, category    | Recipe
updateRecipe       | PATCH | http://localhost:8080/recipes/:id | title, description, imageURL, prepTime, servings, ingredients, steps, category           | Recipe
deleteRecipe       | DELETE | http://localhost:8080/recipes/:id | - | Recipe
likeRecipeById     | POST | http://localhost:8080/recipes/like/:id | - | Recipe
saveRecipeById     | POST | http://localhost:8080/recipes/save/:id | likedBy | Recipe
getSavedRecipes    | GET | http://localhost:8080/recipes/saved/:userId | savedBy | Recipes
postCommentById    | POST | http://localhost:8080/recipes/comments/create/:id | comment | Recipe
deleteCommentById  | POST | http://localhost:8080/recipes/comments/delete/:id | commentIndex | Recipe


## Models

### User
Feld | Typ 
--- |---
id | String
email | String
username | String
authentication | Objekt {password: String, salt: String, sessionToken: String, role: String }

### Recipes
Feld | Typ
--- |---
id | String
title | String
description | String
imageURL | String
likes | Number
servings | Number
createdBy | mongoose.Schema.Types.ObjectId
createdDate | Date
prepTime | Number
ingredients | Objekt[] {amount: Number, unit: String, ingredient: String}
steps | Objekt[] {order: Number, description: String}
comments | Objekt[] {createdBy: mongoose.Schema.Types.ObjectId, createdDate: Date, comment: String}
category | type[] {type: String, enum: [...] }
likedBy | Objekt[] {type: mongoose.Schema.Types.ObjectId}
savedBy | Objekt[] {type: mongoose.Schema.Types.ObjectId}


