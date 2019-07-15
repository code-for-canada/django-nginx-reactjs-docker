# Git Commands and Setup

## Pull Repository

Open git bash

Go to code folder; for example:

```shell
$ cd C:/_dev/code
```

Copy clone from repo using http option

```shell
$ git clone https://github.com/code-for-canada/project-thundercat.git
```

Login to github when prompted

## Running the application

To run the application

```shell
$ docker-compose up
```

Navigate to "localhost:80/status" to see the status of your application.

## Common git commands

### Adding a new branch

Each new feature is made on a new branch off of master, and then a pull request comparing master and that branch is made.

To create a new branch, make sure you are on the lastest master branch and run the following command

```shell
$ git checkout -b <branch_name>
```

### Pushing the branch upstream

To push the local branch to origin, do one of the following:

Option 1:

```shell
$ git push origin <branch_name>
```

Option 2:

```shell
$ git push --set-upstream origin <branch_name>
```

## Merging a change

Do not merge into master from the command line. Only do so via a pull request on GitHub that is reviewed by at least one other developer.

To open a pull request, do so via https://github.com/code-for-canada/project-thundercat
