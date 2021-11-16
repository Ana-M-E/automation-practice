# automation-practice

#### Pre-requisite 
1. Install Node.js
2. Install Node package Manager (npm)
3. Install all required node modules, by running "npm install"

#### Important:
* Test files (scenarios) are stored in _/src/tests_ directory

#### Running tests

* Ready to run scripts are located in _package.json_ (scripts section). 
In order to run a script, type in console --> _**npm run {Type the script name here}**_

* Run one test file only:
	Go to where test files are stored and type in console --> _**testcafe {browser} file_name.js**_

* Run one test only:
  Go to where test files are stored and type in console --> _**testcafe {browser} file_name.js -t "Type the scenario name here"**_

* Run all tests:
  Go to where test files are stored and type in console --> _**testcafe {browser} \***_


For __{browser}__ type the browser name.
For __file_name.js__ type the name of the file you want to run.

For more information about framework:
https://devexpress.github.io/testcafe/documentation/getting-started/
