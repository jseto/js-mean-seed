js-mean-seed [![Build Status](https://travis-ci.org/jseto/js-mean-seed.svg?branch=master)](https://travis-ci.org/jseto/js-mean-seed)
============

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

A starter project for MEAN (MongoDB, Express, Angular, Node).
Based on [Angular][angular]'s [angular-seed](http://github.com/angular/angular-seed) for the front-end and [Loopback][loopback] for the back-end.
    
This project is an application skeleton for a typical [AngularJS](http://angularjs.org/) web app, a [Loopback][loopback] server set-up and tools, a [Passport][passport] login set-up and a test framework for all the components. Additionally it takes benefit form [Bootstrap][bootstrap] responsive framework, [Font Awesome][fontawesome] font icons and [Less][less] CSS preprocessor and bundles [jsLib][jslib], an AngularJS widget library with a localization tool. Finally it is ready for [Travis CI][travis] continuous integration platform and deployment in [Heroku][heroku] cloud application platform.

## Getting Started

To get you started you can simply [clone](http://github.com/jseto/js-mean-seed) the js-mean-seed repository and install the dependencies:

### Prerequisites

You need git to clone the js-mean-seed repository. You can get git from
[http://git-scm.com/][git].

We also use a number of node.js tools to initialize and test js-mean-seed. You must have node.js and
its package manager (npm) installed.  You can get them from [http://nodejs.org/][node].

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

StrongLoop provides a set of tools to make [Loopback][loopback] things easier. It particularly installs the `slc loopback` tool which helps in setting up new models and expose them in the REST API.

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

This will start the webserver and leave it running in the background. To stop the server just

```
npm stop
```

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

## A MEAN seed without the M

As you know, MEAN stands for MongoDB, Express, AngularJS and NodeJS. We haven't talk about MongoDB and we will not talk because js-mean-seed is database agnostic. This is because we use the database abstraction provided by [Loopback][loopback]. Being database agnostic fully decouples the application logic from the database engine. Today you may think MongoDB is cool. Tomorrow? You never know.

## Database

As said above, js-mean-seed is database agnostic. You can choose any of the available [Looback connectors](http://docs.strongloop.com/display/public/LB/Database+connectors). 

By default, js-mean-seed, uses the Memory connector. Be aware that you will loose your data when working with the memory connector. If you want your data to persist, change the database connector or make [Memory connector persistent](http://docs.strongloop.com/display/public/LB/Memory+connector#Memoryconnector-Datapersistence)

### Connecting to a database

The easy way. Use [StrongLoop Arc](http://docs.strongloop.com/display/ARC/StrongLoop+Arc). To invoke Arc

```
slc arc
```
After invoking Arc, a local web page will be opened. Select `Composer` and define your database.

### Creating a new model

The easy way. Use [StrongLoop Arc](http://docs.strongloop.com/display/ARC/StrongLoop+Arc). To invoke Arc

```
slc arc
```

After invoking Arc, again a local web page will be opened. Select `Composer` and define your new model.

Once you have defined your model, you have to let AngularJS to know about the new model. To do that, invoke 

```
npm run build-ng-models
```

if you are using the client development tool, build-ng-models will be invoked automatically.

### Use the models from AngularJS

The models are exposed to angular by running the `build-ng-models` tool. You can access the models in a similar way as you do with Angular's $resource service. For more information see [Loopback's Angular SDK](http://docs.strongloop.com/display/public/LB/AngularJS+JavaScript+SDK#AngularJSJavaScriptSDK-UsingtheSDK)

## Testing

There are 3 kinds of tests in the js-mean-seed application: server Unit tests, client Unit tests and End to End tests.
All of them are written in [Jasmine][jasmine]

### Running Unit Tests

The easiest way to run the unit tests is to use the supplied npm script:

```
npm test
```

###Client Unit tests

The js-mean-seed app comes preconfigured with unit tests. These are written in
[Jasmine][jasmine], which we run with the [Karma Test Runner][karma]. We provide a Karma
configuration file to run them.

* the configuration is found at `test/karma.conf.js`
* the unit tests are found in the `test/client` folder with a similar structure as the code they are testing and are named as `*.spec.js`.

to run this test alone just type

```
npm run test:client
```

This script will start the Karma test runner to execute the unit tests.

If you want to watch the source and test files for changes and then re-run the tests whenever any of them change, run 

```
npm run watch:test:client
```

### End to end testing

The js-mean-seed app comes with end-to-end tests, again written in [Jasmine][jasmine]. These tests
are run with the [Protractor][protractor] End-to-End test runner.  It uses native events and has
special features for Angular applications.

* the configuration is found at `test/protractor-conf.js`
* the e2e tests are found in the `test/client` folder with a similar structure as the code they are testing and are named as `*.e2e-spec.js`.

Protractor simulates interaction with our web app and verifies that the application responds
correctly. Therefore, our web server needs to be serving up the application, so that Protractor
can interact with it. If you run the provided nmp tasks you do not need to worry about that becase they automatically start the server

You can run the end-to-end tests alone using the supplied npm script:

```
npm run test:e2e
```

This script will execute the end-to-end tests against the application being hosted on the
development server.

### Server testing

Server tests are run with the [jasmine-node][jasmine-node] test runner.

*the server tests are found in the `test/server` folder and any javascript file there will be used as test file.

to run this test alone just type

```
npm run test:server
```

This script will start the jasmine-node test runner to execute the unit tests.

If you want to watch the source and test files for changes and then re-run the tests whenever any of them change, run 

```
npm run watch:test:server
```

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


## Developing

We provide several tools to help in the app development phase. Basically are watchers, a browser re-loader and the server itself.
Although you can change the behaviour of the server, the proposed configuration covers all the need you can have and we will focus on client side development. Anyway, if you want a server side development, just invoke the npm task

```
npm run start:dev:server
```

this task will star the test server watcher, the server test watcher and will keep an eye to the files located in the `server` folder. If a file change is detected the server will be restarted.

When developing client side, which is the main effort you have to do in this environment, we provide a handy npm task

```
npm run start:dev:client
```

this task will start the server, the client unit test watcher and the less watcher.

To start both server and client development tools run the following task

```
npm run start:dev:all
```

The provided server uses [Instant][instant] to watch for the files it serves. Instant automatically injects a script-tag right before the closing body tag of any HTML page (including dynamic ones) in order to load the client code.
Whenever a served page changes, Instant instruct to the browser to reload the page. This is a clever reloader solution. If `{ watch: false }` is passed as option or `$NODE_ENV` is set to `production` Instant will behave just like `connect.static()` with no additional overhead.

### Running the App in Production

Set the `$NODE_ENV` environment variable with the value `production`

## Continuous Integration

### Travis CI

[Travis CI][travis] is a continuous integration service, which can monitor GitHub for new commits
to your repository and execute scripts such as building the app or running tests. The js-mean-seed
project contains a Travis configuration file, `.travis.yml`, which will cause Travis to run your
tests when you push to GitHub.

You will need to enable the integration between Travis and GitHub. See the Travis website for more
instruction on how to do this.

## Deploy to Heroku

[Heroku][heroku] is a cloud application platform. If you want to see this seed running in your Heroku account, just click the **Deploy to Heroku** button at the beginning of this document.
The js-mean-seed provides the `app.json` and `Procfile` files required by Heroku.

### Contact, Contribute

If you want support, a new feature or find a bug open a [new issue](https://github.com/jseto/js-mean-seed/issues) in github.
If you want to contribute, just make a pull request with your new code.

# License

__js-mean-seed__ is distributed under the [MIT license](http://opensource.org/licenses/MIT)


[git]: http://git-scm.com/
[bower]: http://bower.io
[npm]: https://www.npmjs.org/
[node]: http://nodejs.org
[protractor]: https://github.com/angular/protractor
[jasmine]: http://jasmine.github.io
[karma]: http://karma-runner.github.io
[travis]: http://travis-ci.org/
[loopback]: http://loopback.io/
[angular]: http://angularjs.org
[passport]: http://passportjs.org/
[bootstrap]: http://getbootstrap.com/
[fontawesome]: http://fortawesome.github.io/Font-Awesome/
[heroku]: http://heroku.com
[less]: http://lesscss.org
[jslib]: http://github.com/jseto/jsLib
[jasmine-node]: http://github.com/mhevery/jasmine-node
[instant]: http://github.com/fgnass/instant