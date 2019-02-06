# How to setup SNYK Autorun on each PR

SNYK is a tool that is used to run security scans for known vulnerabilties among the dependencies of an application. It can be automated to scan the latest pull request for changes in dependencies and scan for vuilnerabilites. The results of the latest online run on the master branch are summarized in the [Readme](./Readme.md) file under the 'Snyk Vulnerabilities' section. From this link you can look at a more detailed breakdown of the vulnerabilites and their cause as well as recommended fixed. You can also trigger a re-run. The web based tool does not detect all problems with all containers, so it is recommended to also run locally periodically.

## Give SNYK access to the repo
 * Create/login to a SNYK account
   * https://app.snyk.io
   * [Login] -> GitHub (or other option if relevant)
 * Add relevant project
    * To add your first repository to Snyk
      * Select 'Projects' tab
      * Select 'Add GitHub Repositories to Snyk'
      * Grant Snyk the required accesses
      * Select the repository(ies) you want to add to Snyk
      * Wait for the import to finish
        * Note, the loading bar will fill up, but you will not be redirected from this page
    * To add another repository to Snyk
      * From the Dashboard page, select 'Add more projects'
      * Select the repository(ies) you want to add to Snyk
      * Wait for the import to finish

From here you can
 * View reports for all the relvant files
 * Create PRs with the suggested fixes
 * Set how often to run the checks
 * Modify settings for each file

## Enable SNYK to automatically run checks on every PR

This will allow SNYK to automatically run tests on every PR if there are changes detected in the given file

This is recommended for each file in each project

 * For each file
   * Click settings (the gear)
   * Scroll down to the **Snyk Test on PRs** section
   * Select the desired settings
   * [Update Snyk Test Settings]

## Enable Automatic PRs

Snyk can be configured to automatically notify developers about new vulnerabilites for a project with an email and the creation of a PR with the recommended fixes on GitHub. This can only be configured for all projects belonging to an orginization, not individual projects.

It is up to the given organization if they want to enable this kind of functionality.

To enable this:
 * Login to Snyk
 * Select the **Settings** tab
 * Select **Integrations**
 * Under **Automatic pull requests**
   * Check **Enable automatic pull requests for all projects in this organization
   * [Update Settings]


# Other Notes on snyk

## Why Snyk is installed locally on a dev machine

In [Setup](../SETUP.md), there are steps outlining how to install snyk locally rather pre-installing it inside the containers

There are a few reasons for this
  * Npm is currently not installed (nor is it needed) in the backend container
  * Snyk uses an individual developer's account, rather than a centralized one
    * Each developer can run snyk 200x in a given month for free
    * Because each dev runs their own test, and PRs are run against a different account, we can run more tests in a given month
  * The docker containers need to be build, but they do not need to be running for snyk to be run locally
    * This means a faster turn around time for checking the results of a security patch locally

## How to run snyk test locally

Running Snyk online is very effective at catching vulnerabilities added by new dependencies within a single docker container. This run can be automated to run wth each PR, or on demand.

However, there is also an advantage to running Snyk locally: it will also detect vulnerabilities between dependent docker containers. For example, the online tool currently assumes that the backend is using Python 3.6.3, and lists vulnerabilities accordingly. However, we are actualy using Python 3.6-slim, which has a different set of vulnerabilities. The local run detects these Docker inter-container dependencies, but the online tool does not.

Make sure you have [snyk](https://app.snyk.io) installed and authorized (see [SETUP](../SETUP.md))

Snyk seems to find more results when run locally than when run in the web application.

'run-snyk-test.sh' will run snyk against frontend and backend.

There are 2 ways to run snyk locally:

### Running snyk from the root of the project

Navigate to the root of the project directory and build a tagged version of the image

```shell
docker build -t <tag_name_to_test> <directory_of_image>
```

Once the image has built, run snyk test

```shell
snyk test --docker <tag_name_to_test> --file=<path_to_dockerfile>
```

Example:
```shell
docker build -t backend_snyk_test backend/
snyk test --docker backend_snyk_test --file=backend/Dockerfile
```

Snyk will output the results to the terminal

### Running snyk from the image directory

Navigate to the image directory build a tagged version of the image

```shell
cd <directory_of_image>
docker build -t <tag_name_to_test> .
```

Once the image has built, run snyk test

```shell
snyk test --docker <tag_name_to_test> --file=<path_to_dockerfile>
```

Example:
```shell
cd backend/
docker build -t backend_snyk_test .
snyk test --docker backend_snyk_test --file=Dockerfile
```

Snyk will output the results to the terminal