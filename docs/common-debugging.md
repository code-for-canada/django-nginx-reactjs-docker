# Known issues and debugging techniques

## Docker and the command line

- Cannot use VM on windows 10 and Docker at the same time
- Cannot VPN into network and use Docker (nginex crashes) when working remotely
  - This seems to be related to the network drives?
  - If docker is running and then I vpn into the network, the computer detects no network drives
  - After running 'docker-compose down' and restating docker, the network drives appear
- Cannot execute 'docker exec' command in git bash
- If you are using DockerToolbox rather than Docker for Windows on Windows, see rm-docker-toolbox-setup

## Debugging '...\r'

We have seen issues with how new lines are saved in different environemnts depending on where they were created.

Open '.gitattributes'

Add '<file_pattern> -crlf'

Commit '.gitattributes'

Open file in question in notepad++

Open Find+Replace dialog

Repalce '\r' with ''. Make sure that 'Search Mode' is in 'Extended mode'

i.e.

' /usr/bin/env: ‘python\r’: No such file or directory' in error message

Open '.gitattributes'

Add '\*.py -crlf'

Commit, replace in notepad++

## There appears to be trouble with your network connection. Retrying...

i.e.

```shell
frontend_1 | info There appears to be trouble with your network connection. Retrying...
frontend_1 | info There appears to be trouble with your network connection. Retrying...
frontend_1 | error An unexpected error occurred: "https://registry.yarnpkg.com/ p-is-promise/-/p-is-promise-2.0.0.tgz: Client network socket disconnected before secure TLS connection was established".
frontend_1 | info If you think this is a bug, please open a bug report with the information provided in "/home/node/yarn-error.log".
frontend_1 | info Visit https://yarnpkg.com/en/docs/cli/install for documentation about this command.
frontend_1 | yarn run v1.12.3
frontend_1 | \$ react-scripts start
frontend_1 | /bin/sh: 1: react-scripts: not found
frontend_1 | error Command failed with exit code 127.
frontend_1 | info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
project-thundercat_frontend_1 exited with code 1
```

Delete yarn.lock file and node_modules and run

```shell
docker-compose up
```

again.

This time it should build. If not, or if this results in changes to your yarn.lock file, simply run

```shell
git checkout frontend/yarn.lock
```

to checkout the old version and then it should work again.

## Cannot start service nginx

On Windows 10, sometimes docker shows the following error when starting up

```shell
$ docker-compose up
Creating network "project-thundercat_default" with the default driver
Creating project-thundercat_frontend_1 ... done
Creating project-thundercat_db_1       ... done
Creating project-thundercat_backend_1  ... done
Creating project-thundercat_nginx_1    ... error

ERROR: for project-thundercat_nginx_1  Cannot start service nginx: OCI runtime create failed: container_linux.go:344: starting container process caused "process_linux.go:424: container init caused \"rootfs_linux.go:58: mounting \\\"/host_mnt/c/_DEV/git/project-thundercat/nginx/nginx-proxy.conf\\\" to rootfs \\\"/var/lib/docker/overlay2/393d58faaa3c6a244293fcff1a14b5bb93f9d2aec735e29346454824d30556c3/merged\\\" at \\\"/var/lib/docker/overlay2/393d58faaa3c6a244293fcff1a14b5bb93f9d2aec735e29346454824d30556c3/merged/etc/nginx/conf.d/default.conf\\\" caused \\\"not a directory\\\"\"": unknown: Are you trying to mount a directory onto a file (or vice-versa)? Check if the specified host path exists and is the expected type

ERROR: for nginx  Cannot start service nginx: OCI runtime create failed: container_linux.go:344: starting container process caused "process_linux.go:424: container init caused \"rootfs_linux.go:58: mounting \\\"/host_mnt/c/_DEV/git/project-thundercat/nginx/nginx-proxy.conf\\\" to rootfs \\\"/var/lib/docker/overlay2/393d58faaa3c6a244293fcff1a14b5bb93f9d2aec735e29346454824d30556c3/merged\\\" at \\\"/var/lib/docker/overlay2/393d58faaa3c6a244293fcff1a14b5bb93f9d2aec735e29346454824d30556c3/merged/etc/nginx/conf.d/default.conf\\\" caused \\\"not a directory\\\"\"": unknown: Are you trying to mount a directory onto a file (or vice-versa)? Check if the specified host path exists and is the expected type
Encountered errors while bringing up the project.
```

To solve this, do the following steps

Ensure the application is not running

```shell
docker-compose down
```

Run PowerShell as admin.

Run

```shell
Set-NetConnectionProfile -interfacealias "vEthernet (DockerNAT)" -NetworkCategory Private
```

Close powershell

Restart docker (right-click on the docker icon -> restart)

After the restart, run

```shell
docker-compose up
```

And everything should be working again
