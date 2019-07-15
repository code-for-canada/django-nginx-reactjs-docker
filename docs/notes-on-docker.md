# Docker

## Configuration

This application contains two Docker setups: 1 for local development optimized for writing code and debugging, and 1 that's production ready, optimized for security and performance.

### Localhost

Localhost setup uses Docker to run 4 containers: Nginx server, Node frontend application, a Django Backend API, and a PostgreSQL DB. Using a dev server for React locally like this allows for immediately visible changes, much faster development, and a container to run tests in.

![Docker Localhost diagram](/docs/images/docker-local.png)

### Production

Production will have 2 containers because our frontend will be served statically by Nginx (`yarn build` will create this static package). This is best practices for a production-ready react application. The DB would be static.

This will require creating separate docker compose files for production.

In this diagram, the backend would be accessed with the same root URL than our frontend and the API is our second service and will be discovered behind a proxy of our first server. This way we won't have any problem of browsers throwing Cross-origin resource sharing issues. This also assumes we would use an external DB that would be assessed via a URL and credentials.

![Docker Production diagram](/docs/images/docker-production.png)

References:
Dockerize your App - diagrams modified from here
https://github.com/felipelm/django-nginx-reactjs-docker: original project we forked from

## How to run

Make sure you have [docker](https://docs.docker.com/install/) and [docker-compose](https://docs.docker.com/compose/install/) installed.

Run:

```shell
docker-compose up
```

Then, in the browser, go to localhost:80 and you should see the application with a response from the backend.

When killing the server, be sure to cleanup your containers.

```shell
docker-compose down
```

## Other commands

To start docker without it taking over the command terminal, use the following (note, this will not display all the output, so you may not see error messages):

```shell
docker-compose up -d
```

To shut down docker after staring it with the -d command, run

```shell
docker-compose stop
```

To shut down and cleanup the networkl after staring it with the -d command, run

```shell
docker-compose down
```

Then check which image is running using `docker images` and run

```shell
docker run -p 8000:80 image_id sh entrypoint.sh
```

This will destory all stopped containers and force docker to rebuild these containers the next time you start docker

```shell
docker-compose rm
```
