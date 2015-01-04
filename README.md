js-mean-seed [![Build Status](https://travis-ci.org/jseto/js-mean-seed.svg?branch=master)](https://travis-ci.org/jseto/js-mean-seed)
============

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

A starter project for MEAN (MongoDB, Express, Angular, Node).
Based on [Angular](http://angularjs.org)'s [angular-seed](http://github.com/angular/angular-seed) for the front-end and [Loopback](http://loopback.io/) for the back-end.
    
This project is an application skeleton for a typical [AngularJS](http://angularjs.org/) web app, a [Loopback](http://loopback.io/) server set-up and tools, a [Passport](http://passportjs.org/) login set-up and a test framework for all the components. Additionally it takes benefit form [Bootstrap](http://getbootstrap.com/) responsive framework, [Font Awesome](http://fortawesome.github.io/Font-Awesome/) font icons and [Less](http://lesscss.org) CSS preprocessor and bundles [jsLib](http://github.com/jseto/jsLib), an AngularJS widget library with a localization tool. Finally it is ready for [Travis CI](http://travis-ci.org/) continuous integration platform and deployment in [Heroku](http://heroku.com) cloud application platform.

## Getting Started

To get you started you can simply [clone](http://github.com/jseto/js-mean-seed) the js-mean-seed repository and install the dependencies:

### Prerequisites

You need git to clone the js-mean-seed repository. You can get git from
[http://git-scm.com/](http://git-scm.com/).

We also use a number of node.js tools to initialize and test js-mean-seed. You must have node.js and
its package manager (npm) installed.  You can get them from [http://nodejs.org/](http://nodejs.org/).

### Clone js-mean-seed

Clone the js-mean-seed repository using [git][git]:

```
git clone https://github.com/jseto/js-mean-seed.git
cd js-mean-seed
```

If you just want to start a new project without the js-mean-seed commit history then you can do:

```bash
git clone --depth=1 https://github.com/jseto/js-mean-seed.git <your-project-name>
```

The `depth=1` tells git to only pull down one commit worth of historical data.

### Install StrongLoop 

StrongLoop provides a set of tools to make Loopback things easier. It particularly installs the `slc loopback` tool which helps in setting up new models and expose them in the REST API.

You should install StrongLoop as a generic node module in order to get access to 'slc' from the command line. To install StrongLoop:

```
npm install -g strongloop
```

During installation, you may see a number of errors from node-gyp. These errors only prevent you from performing certain monitoring and management functions. Refer to [StronLoop](http://http://docs.strongloop.com/) if you are interested in those functions. 

### Install Dependencies

We have two kinds of dependencies in this project: tools and angular framework code.  The tools help
us manage and test the application.

* We get the tools we depend upon via `npm`, the [node package manager][npm].
* We get the angular code via `bower`, a [client-side code package manager][bower].

We have preconfigured `npm` to automatically run `bower` so we can simply do:

```
npm install
```

Behind the scenes this will also call `bower install`.  You should find that you have two new
folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `client/bower_components` - contains the angular framework files

*Note that the `bower_components` folder would normally be installed in the root folder but
js-mean-seed changes this location through the `.bowerrc` file.  Putting it in the client folder makes
it easier to serve the files by a webserver.*

### Run the Application

We have preconfigured the project with a web server.  The simplest way to start
this server is:

```
npm start
```

Now browse to the app at `http://localhost:3000`.



## Directory Layout

```
client/             --> all of the source files for the application
  auth/             --> sign up - sign in related files
  images/           --> application images
  locale/           --> application locale files
  models/           --> generated model access services
  views/            --> application views. Both partial and controller
    contact/          --> in construction sample view
      contact.html      --> partial for the view
      contact.js        --> view controller
    footer/           --> single page app footer
      footer.html       --> partial for the view
      footer.js         --> view controller
    header/           --> single page app header 
      header.html       --> partial for the view
      header.js         --> view controller
    home/             --> single page app footer
      home.html         --> partial for the view
      home.js           --> view controller
  app.js                --> main application module
  index.html            --> app layout file (the main html template file of the app)
  index-async.html      --> just like index.html, but loads js files asynchronously
common/             --> common stuff for client and server
  models/             --> generated model definition files
less/               --> app less files
  app.less            --> app custom css classes
server/             --> server side stuff
  boot/               --> loopback boot files
  *.json              --> loopback configuration files
  server.js           --> server app main file
test/               --> test related stuff
  client/             --> client spec files
  server/             --> server spec files
  karma.conf.js       --> config file for running unit tests with Karma
  protractor.conf.js  --> Protractor config file
.bowerrc            --> specifies where bower components will be installed
.gitignore          --> files to ignore by git
.jshintrc           --> jsHint conf file
.travis.yml         --> Travis CI conf file
app.json            --> app description for Heroku deploy button
bower.json          --> bower components to install
package.json        --> node modules to install an scripts
Procfile            --> Heroku conf file
README.md           --> Documentation
```

## Testing

There are two kinds of tests in the js-mean-seed application: Unit tests and End to End tests.

### Running Unit Tests

The js-mean-seed app comes preconfigured with unit tests. These are written in
[Jasmine][jasmine], which we run with the [Karma Test Runner][karma]. We provide a Karma
configuration file to run them.

* the configuration is found at `karma.conf.js`
* the unit tests are found next to the code they are testing and are named as `..._test.js`.

The easiest way to run the unit tests is to use the supplied npm script:

```
npm test
```

This script will start the Karma test runner to execute the unit tests. Moreover, Karma will sit and
watch the source and test files for changes and then re-run the tests whenever any of them change.
This is the recommended strategy; if your unit tests are being run every time you save a file then
you receive instant feedback on any changes that break the expected code functionality.

You can also ask Karma to do a single run of the tests and then exit.  This is useful if you want to
check that a particular version of the code is operating as expected.  The project contains a
predefined script to do this:

```
npm run test-single-run
```


### End to end testing

The js-mean-seed app comes with end-to-end tests, again written in [Jasmine][jasmine]. These tests
are run with the [Protractor][protractor] End-to-End test runner.  It uses native events and has
special features for Angular applications.

* the configuration is found at `e2e-tests/protractor-conf.js`
* the end-to-end tests are found in `e2e-tests/scenarios.js`

Protractor simulates interaction with our web app and verifies that the application responds
correctly. Therefore, our web server needs to be serving up the application, so that Protractor
can interact with it.

```
npm start
```

In addition, since Protractor is built upon WebDriver we need to install this.  The js-mean-seed
project comes with a predefined script to do this:

```
npm run update-webdriver
```

This will download and install the latest version of the stand-alone WebDriver tool.

Once you have ensured that the development web server hosting our application is up and running
and WebDriver is updated, you can run the end-to-end tests using the supplied npm script:

```
npm run protractor
```

This script will execute the end-to-end tests against the application being hosted on the
development server.


## Updating Angular

Previously we recommended that you merge in changes to js-mean-seed into your own fork of the project.
Now that the angular framework library code and tools are acquired through package managers (npm and
bower) you can use these tools instead to update the dependencies.

You can update the tool dependencies by running:

```
npm update
```

This will find the latest versions that match the version ranges specified in the `package.json` file.

You can update the Angular dependencies by running:

```
bower update
```

This will find the latest versions that match the version ranges specified in the `bower.json` file.


## Loading Angular Asynchronously

The js-mean-seed project supports loading the framework and application scripts asynchronously.  The
special `index-async.html` is designed to support this style of loading.  For it to work you must
inject a piece of Angular JavaScript into the HTML page.  The project has a predefined script to help
do this.

```
npm run update-index-async
```

This will copy the contents of the `angular-loader.js` library file into the `index-async.html` page.
You can run this every time you update the version of Angular that you are using.


## Serving the Application Files

While angular is client-side-only technology and it's possible to create angular webapps that
don't require a backend server at all, we recommend serving the project files using a local
webserver during development to avoid issues with security restrictions (sandbox) in browsers. The
sandbox implementation varies between browsers, but quite often prevents things like cookies, xhr,
etc to function properly when an html page is opened via `file://` scheme instead of `http://`.


### Running the App during Development

The js-mean-seed project comes preconfigured with a local development webserver.  It is a node.js
tool called [http-server][http-server].  You can start this webserver with `npm start` but you may choose to
install the tool globally:

```
sudo npm install -g http-server
```

Then you can start your own development web server to serve static files from a folder by
running:

```
http-server -a localhost -p 8000
```

Alternatively, you can choose to configure your own webserver, such as apache or nginx. Just
configure your server to serve the files under the `app/` directory.


### Running the App in Production

This really depends on how complex your app is and the overall infrastructure of your system, but
the general rule is that all you need in production are all the files under the `app/` directory.
Everything else should be omitted.

Angular apps are really just a bunch of static html, css and js files that just need to be hosted
somewhere they can be accessed by browsers.

If your Angular app is talking to the backend server via xhr or other means, you need to figure
out what is the best way to host the static files to comply with the same origin policy if
applicable. Usually this is done by hosting the files by the backend server or through
reverse-proxying the backend server(s) and webserver(s).


## Continuous Integration

### Travis CI

[Travis CI][travis] is a continuous integration service, which can monitor GitHub for new commits
to your repository and execute scripts such as building the app or running tests. The js-mean-seed
project contains a Travis configuration file, `.travis.yml`, which will cause Travis to run your
tests when you push to GitHub.

You will need to enable the integration between Travis and GitHub. See the Travis website for more
instruction on how to do this.


[git]: http://git-scm.com/
[bower]: http://bower.io
[npm]: https://www.npmjs.org/
[node]: http://nodejs.org
[protractor]: https://github.com/angular/protractor
[jasmine]: http://jasmine.github.io
[karma]: http://karma-runner.github.io
[travis]: https://travis-ci.org/
