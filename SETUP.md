## Setup Dev Environment

### Install needed applications

Ensure that you have docker and docker-compose installed on your machine, as well as the rest of the Python stack.
 * GitBash
 * Python 3.6.7
   * https://www.python.org/downloads/release/python-367/ - Windows x86-64 executable installer
   * “Install now”
   * Bypass character count limit option
   * You should be able to open a Python 3.6 Desktop App and run lines of Python
 * Docker
 * Docker Compose
 * Visual Studios Code
   * Install
     * Download VS Code for Windows
     * Download location is default: C:\Users\cbrock\AppData\Local\Programs\Microsoft VS Code
     * Check “Create a desktop icon”
     * Click “Install”
   * Customize Tools and Languages - install language specific packages
     * Python by Microsoft
     * Docker by Microsoft
     * Django by Baptiste Darthenay
     * PostgreSQL by Chris Kolkman
     * React Redux ES6 Snippets by Timothy McLane
     * ESLint by Dirk Baeumer
     * Git History Diff by Hui Zhou
   * Linting Configuration
     * Pylint:
       1. Open '*.\project-thundercat\.vscode\settings.json*' file
       2. Search for 'python.linting.pylintEnabled' and make sure it is set to 'true' (User and Workspace settings)
       3. Now, you can edit the desired settings from *.pylintrc* file (to disable messages, see line 54 of the config file)
       4. Click [here](http://pylint-messages.wikidot.com/all-messages) for more details on most of the Pylint errors/warnings
     * ESLint:
       1. Open '*.\project-thundercat\.vscode\settings.json*' file
       2. Search for 'eslint.enable' and make sure it is set to 'true' (User and Workspace settings)
       3. Select 'USER SETTINGS' tab  in the right hand side window of the settings file
       4. Add the following parameter: "eslint.options": {"configFile": "<path_of_your_project_root>\\\\frontend\\\\eslint.json"}
       5. ESLint is now installed and configured
           * If ESLint is not working, do the following steps:
              1. Close Docker: Right Click on Docker icon + Quit Docker
              2. Navigate in your Windows explorer and delete the folder called '*node_modules*' under '.\\\\project-thundercat\\\\frontend'
              3. Start Docker
              4. Open a powershell window and do a '*docker-compose up*'
              5. Wait a couple minutes to make sure that all packages have been downloaded
              6. Restart VS Code
       6. You can also add/edit/remove rules from *eslint.json* file     
       7. Click [here](https://eslint.org/) for more details about **ESLint** or [here](https://github.com/airbnb/javascript/tree/master/react#basic-rules) to know more about the Airbnb React style
 * Snyk
   * Run 'npm install -g snyk' in a terminal
   * Run 'npm install -g snyk-to-html' in a terminal
     * This allows for clean output to html files when snyk is run locally
     * Locally detected vulnerabilities can be documented in the repo and version controlled
   * See [snyk.md](docs/snyk.md) for an explanation of why snyk is installed locally rather than in the containers
   * Add the npm directory containing snyk to the path system environment variable (usually "C:\Users\<name>\AppData\Roaming\npm")
     * Note: You may need to restart your computer for this change to take effect
   * Create an account on snyk.io
   * Run 'snyk auth' in a terminal
   * Login when prompted (either in using the provided URL or in the opened browser)
