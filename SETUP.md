## Setup Dev Environment

### Install needed applications

Ensure that you have docker and docker-compose installed on your machine, as well as the rest of the Python stack.

- GitBash
- Python 3.6.7
  - https://www.python.org/downloads/release/python-367/ - Windows x86-64 executable installer
  - “Install now”
  - Bypass character count limit option
  - You should be able to open a Python 3.6 Desktop App and run lines of Python
- PiP
  - Download get-pip.py
    - Go to https://bootstrap.pypa.io/
    - Right click on 'get-pip.py' -> 'Save link as...'
    - Select a download location
  - Navigate to the file in a terminal, run 'python get-pip.py'
  - Add pip's directory to the path system environment variable (usually "<Python Directory>\Scripts")
  - Pip is used to build the backend so that snyk can anaylze it locally
- Docker
- Docker Compose
- Visual Studios Code
  - Install
    - Download VS Code for Windows
    - Download location is default: C:\Users\cbrock\AppData\Local\Programs\Microsoft VS Code
    - Check “Create a desktop icon”
    - Click “Install”
  - Customize Tools and Languages - install language specific packages
    - Python by Microsoft
    - Docker by Microsoft
    - Django by Baptiste Darthenay
    - PostgreSQL by Chris Kolkman
    - React Redux ES6 Snippets by Timothy McLane
    - ESLint by Dirk Baeumer
    - Prettier - Code formatter by Esben Petersen
    - Git History Diff by Hui Zhou
  - Linting Configuration
    - Pylint:
      1.  Open '_.\project-thundercat\.vscode\settings.json_' file
      2.  Add the following setting: _"python.linting.pylintEnabled": true_
      3.  Now, you can edit the desired settings from _.pylintrc_ file (to disable messages, see line 54 of the config file)
      4.  Click [here](http://pylint-messages.wikidot.com/all-messages) for more details on most of the Pylint errors/warnings
    - ESLint:
      1.  Open '_.\project-thundercat\.vscode\settings.json_' file
      2.  Add the following setting:
          - _"eslint.enable": true_
          - _"editor.formatOnSave": true_
          - _"eslint.options": {"configFile": "<path_of_your_project_root>\\\\frontend\\\\.eslintrc.json"}_
      3.  ESLint is now installed and configured
          - If ESLint is not working, do the following steps:
            1. Close Docker: Right Click on Docker icon + Quit Docker
            2. Navigate in your Windows explorer and delete the folder called '_node_modules_' under '.\\\\project-thundercat\\\\frontend'
            3. Start Docker
            4. Open a powershell window and do a '_docker-compose up_'
            5. Wait a couple minutes to make sure that all packages have been downloaded
            6. Restart VS Code
      4.  You can also add/edit/remove rules from _.prettierrc.json_ file
      5.  Click [here](https://eslint.org/) for more details about **ESLint** or [here](https://github.com/airbnb/javascript/tree/master/react#basic-rules) to know more about the Airbnb React style
  - Other Useful Configurations
    - Add the following settings to your _settings.json_ file:
      - _"explorer.confirmDragAndDrop": false,_
      - _"javascript.updateImportsOnFileMove.enabled": "always",_

* Snyk

  - Run 'npm install -g snyk' in a terminal
  - Run 'npm install -g snyk-to-html' in a terminal
    - This allows for clean output to html files when snyk is run locally
    - Locally detected vulnerabilities can be documented in the repo and version controlled
  - See [snyk.md](docs/snyk.md) for an explanation of why snyk is installed locally rather than in the containers
  - Add the npm directory containing snyk to the path system environment variable (usually "C:\Users\<name>\AppData\Roaming\npm")
    - Note: You may need to restart your computer for this change to take effect
  - Create an account on snyk.io
  - Run 'snyk auth' in a terminal
  - Login when prompted (either in using the provided URL or in the opened browser)

* Accessibility Check Tool (pa11y)

  - Run 'run 'npm install -g pa11y' in a terminal
  - Run also 'npm install -g pa11y pa11y-reporter-html' in a terminal
    - This allows for clean output to html file when this tool is run locally
    - It detects errors, warnings and notices related to accessibility of the application
  - Make sure that the npm directory containing pa11y is part of the path system environment variable (usually "C:\Users\<name>\AppData\Roaming\npm")
    - Should have already been added during Snyk configuration (see above)
  - Click [here](https://github.com/pa11y/pa11y) to have more details about pa11y.
