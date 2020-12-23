MATCHA - 42 PROJECT
=========================

## Description of the project :

Matcha is a dating web application.

## Team 
	- Yixuan WANG - yiwang@student.42.fr
	- Abdeljalil Naceur -abnaceur@student.42.fr


## Project's Goals and objectives

Create a platform for dating but event more matching the right people
making finding the soulmate easy.

## Technologies :
    - ReactJs 16.10.2
	- Redux 4.0.0
    - Webpack
    - Nodejs v10.7.0
    - Docker 17.12.1-ce
    - MYSQL/PhpMyAdmin
    - SocketIo

## Screenshots

## Git flow
There are three branches:
 - Master - origin
 - Staging - follow master
 - Develop - follow staging

The *Master* branch is used for production. Only the features we know are perfectly working should be merged on *Master*  
The *Staging* branch is made for testing purposes. Once a feature is developed, it is merged on *Staging*.  
The *Develop* branch is where new features are developped.

We will use a strategy of *continuous integration*: the code is merged on its mother branch multiple times a day. This will help prevent what is known as "the merge hell".  
It will greatly improve the speed of developement and make development seamless.  
We will also use a continuous *delivery workflow*, where the code on the master branch is always ready for deployment.  

## Git Commit messages guidlines

Commit messages should conform to the following rules:  
	- Title in capital letters  
	- The title is separated from the body of the message by one empty line  
	- A line should not be longer than 80 characters  
	- The message must focus on the WHY and WHAT, not HOW.  
  
This template can be used for the commit messages:  

> COMMIT MESSAGE TITLE
> 
> Here, I explain WHAT I did (the improvements I made to the code, what I removed
> from it, etc...)
> I alos explain WHY I did it.
  
A template ready for usage is also avaible in the *misc* floder, at the root of the repo.  

## Install the development environment

Get the source:

```bash
git clone https://me-me@bitbucket.org/me-me/matcha-42.git 
```

Edit your `/etc/hosts` file:

```
127.0.0.1   si.matcha.local
127.0.0.1   phpmyadmin.matcha.local
127.0.0.1   app.matcha.local
```

## Build the project


####Setup the environement varibales

- Within the root path 

```bash
# environment variables

```

- Navigate to /backend path 

```bash
# environment variables
cp .env-template .env
```

- Navigate to /frontend path 

```bash
# environment variables
cp .env-template .env
```

####Build the containers

In the root path

```bash
docker-compose up --build
```

Note : the port 80 must not be used by another application (like Apache or Skype).

P.S : The build may take some time don't worry be happy and grab a cup of tea :)

Once the containers started.
Navigate to frontend to start the server.

```bash
npm start
```
P.S : npm version 6.7.0


####List of links

```bash
si.matcha.local:3000 -> backend ( REST API )
app.matcha.local:8083 -> frontend
phpmyadmin.matcha.local:8080 -> phpMyAdmin
```

####Database connection

- Navigate to : phpmyadmin.matcha.local:8080
	- Username : root
	- Password : root
	- Database name : matcha

- If the connection to the mySQL server is not established from 
the backend then check the ip address of your muSQL container
and if it is not identical then change the variable	DB_HOST in /backend/.env

To find your container IP address (Get sure the container matcha_mysql is up)

```bash
docker inspect matcha_mysql | grep IPAddress
```

### Guideline :

For git flow all new branches feature/fixes should follow develop

```bash
# Create a new branch
git checkout -b "branch_name"
# follow upstream develop
git branch -u develop
```

Please remember to always pull before pushing your branch
this good practise is to avoid merge conflicts (correct them if there are any :) ).

##### Nice to know
- We dont-use Jquery within JSX components.
- Either react-boostrap packages or ChartJs/react-chartJs
*ı***
### Help

If you face this error message in backend "no space left"
the stop docker and execute this command :

```bash
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```
Explanation :

```bash
 echo fs.inotify.max_user_watches=524288 it increase the number of watches of nodemon as you made some changes in your project and sudo tee -a /etc/sysctl.conf && sudo sysctl -p is sysctl command for configure kernel parameters at runtime
```

Stop and remove all containers

```bash
docker stop $(docker ps -a -q)
```

Connect to a container via bash (get the container name you want to connect to via command `docker ps`)
```bash
docker exec -ti containername bash
```

Execute a command directly in a container without connecting in bash (get the container name you want to connect to via command `docker ps`)

```bash
docker exec -i containername yourcommand
```

Delete all inages 

```bash
docker rmi -f $(docker images -q)
```

Show images 

```bash
docker images
```
