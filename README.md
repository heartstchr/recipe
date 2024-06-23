# Recipe

> food is all you need

## prerequisit
[Nuxt](https://nuxtjs.org/faq/deployment-aws-s3-cloudfront/)

```bash
# node version
$ node -v 
v8.10.0

# npm version
$ npm -v 
6.10.2

# Global dependencies
$ npm install -g gulp

```

## Setup

``` bash
# Git pull

# install dependencies
$ yarn install

# Serve with hot reload at localhost:3000
$ yarn dev

# generate static project
$ yarn generate

# runthe above geerated dist folder in root
$ http-server dist/ -p 3000
```
## deploy
```bash
# Deploy to S3 bucket static hosting using gulp 
$ ./deploy.sh
```
