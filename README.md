# Project ThunderCAT

This application is a collaboration between Code for Canada and the Public Service Commission of Canada.

This project serves as an example of a deployment front-end (ReactJS) and back-end (Django with PostgreSQL DB) using docker and nginx.

## Quick start

1. Follow our [setup guide](./SETUP.md) to configure your workstation.
2. Clone the repository using [git](./doc/contributing-with-git.md)
3. `docker-compose up` to build the application if you have not done so already
4. Open your browser to [http://localhost:80/](http://localhost:80/).

To see a list of all build commands, run `docker` from the repository root or see our [notes-on-docker](./docs/notes-on-docker.md).

## How to help

Interested in what we're working? [Learn more about us and our project](https://medium.com/code-for-canada/inboxing-clever-db6a334dda7d).
Want to contribute? Please email caley@codefor.ca.

## What's in this repo?

Here's a quick overview of the major landmarks:

### [backend](./backend)

The server for our CAT platform, a [Django](https://www.djangoproject.com/) application responsible for:

- not much yet, but it will hold our APIs

### [frontend](./frontend)

The [ReactJS](https://reactjs.org/) application that users will see. It uses the Airbnb Styleguide. It will get built into a static package that we serve through nginx once we deploy it.
We are using a combination of [React-Bootstrap](https://react-bootstrap.github.io/), [Aurora Design System](https://design.gccollab.ca/component), and custom PSC-specific for our components.

This includes:

- home page
- status page
- any prototypes we're working on

### Documentation

- [SETUP](./SETUP.md): Instructions to get everything up and running.
- [TESTING](./TESTING.md): How to be sure nothing broke.
- [LICENSE](./LICENSE.md): MIT
- There are many more topical guides in the [docs](./docs) folder.
- In addition, several sections of the repository have their own documentation:
  - [frontend/README](./frontend/README.md)
  - [backend/README](./backend/README.md)

## Snyk Vulnerabilities

frontend/package.json -> [![Known Vulnerabilities](https://snyk.io/test/github/code-for-canada/project-thundercat/badge.svg?targetFile=frontend%2Fpackage.json)](https://snyk.io/test/github/code-for-canada/project-thundercat?targetFile=frontend%2Fpackage.json)

backend/requirements.txt -> [![Known Vulnerabilities](https://snyk.io/test/github/code-for-canada/project-thundercat/badge.svg?targetFile=backend%2Frequirements.txt)](https://snyk.io/test/github/code-for-canada/project-thundercat?targetFile=backend%2Frequirements.txt)
