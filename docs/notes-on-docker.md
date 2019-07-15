# Docker

## Configuration

This application contains two Docker setups: 1 for local development optimized for writing code and debugging, and 1 that's production ready, optimized for security and performance.

TODO(caleybrock) - add diagrams.

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
