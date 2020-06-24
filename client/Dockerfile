FROM node:latest
########################################
# Maintained by abnaceur@student.42.fr #
########################################
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm i -g react-scripts
RUN npm install  
COPY . /usr/src/app
EXPOSE 5000
CMD [ "npm start" ]