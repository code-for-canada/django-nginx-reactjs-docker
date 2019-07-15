# Project ThunderCAT

This application is a collaboration between Code for Canada (Cohort 2 Fellowship) and the Public Service Commission of Canada (PSC). It is called the Competency Assessment Tool (CAT) or Outil d’évaluation des compétences (OEC), and is a platform to host the Electronic Managerial Inbox (eMIB), as assessment developed by the Public Service Commission to assess managerial candidates in the federal government. For more about the project please visit the [project updates blog](https://code-for-canada.github.io/psc-updates/).

![Application screenshot](/docs/images/CAT-candidate-home.png)

This application introduced a [new tech stack for the PSC](https://code-for-canada.github.io/psc-updates/update-6/). It has a ReactJS front-end, Django back-end, and PostgreSQL DB. It uses Docker containers and Nginx as a web proxy.

![Tech stack diagram](/docs/images/tech-stack.png)

## Quick start

1. Follow our [setup guide](./SETUP.md) to configure your workstation.
2. Clone the repository using [git](./doc/contributing-with-git.md).
3. `docker-compose up` to build the application if you have not done so already
4. Open your browser to [http://localhost:80/](http://localhost:80/).

To see a list of all build commands, run `docker` from the repository root or see our [notes-on-docker](./docs/notes-on-docker.md).

## Contributing

All changes to the application (no matter how small) require a pull request, with a filled out description (there's a template), passing CI runs, and at least one approval code review approval from a team member. Sometimes a designer or PM review is also required.

Want to contribute? Please email Caley Brock, the Code for Canada Development Fellow at the Public Service Commission, at caley@codefor.ca.

Note: After August 2019, this project will transfer ownership to the PSC, and the repository under [code-for-canada](https://github.com/code-for-canada) with no longer be updated.

## What's in this repo?

Here's a quick overview of the major landmarks:

### [backend](./backend)

The [Django](https://www.djangoproject.com/) application that manages data and requests through [REST APIs](https://www.django-rest-framework.org/). Urls starting with `/api/` are sent to the backend.

The backend is responsible for the direct interaction with PostgreSQL, data model definition, migrations, and API logic for

- user management (candidates and admins) and sessions
- test definitions (ie versions of test type eMIB) and test security
- user test results

### [frontend](./frontend)

The [ReactJS](https://reactjs.org/) application that users will see. It uses the Airbnb Styleguide. It will get built into a static package that we serve through nginx in production.
We are using a combination of [React-Bootstrap](https://react-bootstrap.github.io/), [Aurora Design System](https://design.gccollab.ca/component), and custom PSC-specific styles for our components. It is localized into French and English and is in development to meet accessibility standards.

The frontend includes components, logic, and API interaction for:

- a home page for logged in an logged out users (/)
- a status page (/status)
- a public facing sample eMIB test (/emib-sample)
- tools for candidates and administrators in real test sessions (/dashboard)

### Documentation

- [SETUP](./SETUP.md): Instructions to get everything up and running.
- [TESTING](./TESTING.md): How to be sure nothing broke.
- [LICENSE](./LICENSE.md): MIT
- [Docker Setup](./docs/notes-on-docker.md) - diagrams explaining the container setup
- There are many more topical guides in the [docs](./docs) folder.
- In addition, several sections of the repository have their own documentation:
  - [frontend/README](./frontend/README.md)
  - [backend/README](./backend/README.md)

## CI Tools

Each pull request runs all tests via [Travis](https://travis-ci.org/), scans all packages via [Snyk](https://snyk.io/), and deploys the frontend to a review app via [Heroku](https://devcenter.heroku.com/articles/github-integration-review-apps).

Note: Heroku disabled as of June 2019.

![CI/CD Diagram](/docs/images/CI-CD.png)

### Snyk Vulnerabilities

frontend/package.json -> [![Known Vulnerabilities](https://snyk.io/test/github/code-for-canada/project-thundercat/badge.svg?targetFile=frontend%2Fpackage.json)](https://snyk.io/test/github/code-for-canada/project-thundercat?targetFile=frontend%2Fpackage.json)

backend/requirements.txt -> [![Known Vulnerabilities](https://snyk.io/test/github/code-for-canada/project-thundercat/badge.svg?targetFile=backend%2Frequirements.txt)](https://snyk.io/test/github/code-for-canada/project-thundercat?targetFile=backend%2Frequirements.txt)
