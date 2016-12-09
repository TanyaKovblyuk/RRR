# Social network service
[*Ruby, Rails, React, Redux, Webpack*]
***
# Basic Demo Setup

#### *Preparation*
> App uses PostgreSQL. You need change config in database.yml or create new pg_user:
#
```sh
$ sudo -u postgres createuser -s rails_user
$ sudo -u postgres psql
in postgres=#
$ \password rails_user
$ password
$ password
$ \q
```

#### *Install*
1.Open terminal window in *backend* folder and run:

```sh
a)bundle install
b)rake db:setup
c)rails s
```
2.Open next terminal window in *frontend* folder and run:

```sh
a) npm install `or` sudo npm install
b) npm start
```
3.Wait to start all servers

4.Visit http://localhost:8080

5.Create new user or login as demo-user:
> [*email:* my_email@exemple.com, *password:* Truepass1]


***
#
# Run test

***

### *Rails test*

[*controllers, models, mailer, helpers test*]

* Open terminal window in *backend* folder and run: `rails test test`

***

### *Some react classes test*

[*Jest*]

* Open terminal window in *backend* folder and run: `npm test`

***

### *Integration test*

[*Protractor, Chrome, Jasmine*]

* Open terminal window in *backend* folder and run: `rails s`
* Open next terminal window in *frontend* folder and run: `npm start`
* Open next terminal window in *frontend* folder again and run: `npm run integration`

> If test don't run, update your webDriver: run `./node_modules/protractor/bin/webdriver-manager update` and `webdriver-manager update`.
