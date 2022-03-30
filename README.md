## Projet LPDW Simonin Céline

### Lancer le projet :
Cloner le répertoire github en local

Assurez vous d'avoir un SGBD (MySQL) fonctionnel et disponible. 
Les variables de connexions sont en dure dans le code.

- npm i @hapi/glue
- npm install

Puis lancer le site avec "npm start".

Vous pourrez acceder au site via l'url : `http://localhost:3000/documentation`

### Utilisation :
Créer un utilisateur avec la route "/user" en POST.
La route "/user/login" permet de se connecter.
Enfin pour vous authentifier utilisez le bouton Authorize avec pour login bearer+token d'authentification.

### Variables de connxions
Disponibles dans manifest.js
