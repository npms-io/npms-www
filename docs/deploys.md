# Deploys

We use `pm2` to deploy `npms-www`, install it by running `$ npm install -g pm2`. You may find the pm2 configuration file in `ecosystem.json5`.
The website itself is served through [nginx](http://nginx.org/) which is great to serve static content.


## Setting up

Before doing the first deploy, you need to setup the server.

### PM2

- Create the `www` user on server
- Add `www` user to the list of sudoers
- Install pm2 in the server
- Setup the deploy environment by running `$ pm2 deploy ecosystem.json5 production setup` in your local machine
- Create `~/npms-www/parameters.json` in the server with the custom configuration (API URL, Google Analytics id, etc)
- Do your first deploy by running `$ pm2 deploy ecosystem.json5 production` in your local machine

### nginx

- Install nginx in the server by running `$ sudo aptitude install nginx`
- Apply the https://github.com/h5bp/server-configs-nginx server config suggestions wisely
  - Apply best practices in `nginx.conf`
  - Replace the `mime.types` with the h5bp one
  - Copy h5bp into `/etc/nginx`
- Setup a new site (or just use the `default`) in `/etc/nginx/sites-available` with config below
- Finally restart nginx by running `$ sudo service nginx restart`

```
server {
  listen *:80;
  root /home/www/npms-www//web;

  include h5bp/basic.conf;

  # url rewrite
  location / {
     try_files $uri $uri/ @missing;
  }

  location @missing {
    rewrite ^ /index.html last;
  }

  location /api/ {
    proxy_pass http://127.0.0.1:3000/;

    # Do not buffer, improves performance
    proxy_buffering    off;
    proxy_buffer_size  128k;
    proxy_buffers 100  128k;

    # Fix some headers
    proxy_set_header  X-Real-IP  $remote_addr;
    proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header  Host $http_host;
  }
}
```


## Deploying

Deployment is easy, just run `$ pm2 deploy ecosystem.json5 production` in your local machine
