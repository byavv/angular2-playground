## angular2 playground app (beta 1)
An example Angular 2 learning project.

#### Themes covered
 - Components communication
 - Http service extending
 - Rx.js in terms of angular 2
 - Dive into forms
 - Awesome router
 - Bonus sample market app
 - More to come..
 
#### Requirements
 - [mongodb](https://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/)
 - nodemon
 - gulp
 
#### Installation
```bash
npm install
bower install
typings install
```
 **!!! Important !!!**
    Sample app uses big db with almost 10000 records. Project contains db dump, so just run
```bash
mongorestore --db playground dump/playground
```     
#### Start
```bash
gulp
```
Open [http://localhost:3030](http://localhost:3030)