Spotippos Front-End Challange Code!
===================


Challange
-------------
The mission is create a result page with all spotippos advertisements

----------

## Prerequisites

Make sure you have installed all of the following prerequisites on your development machine:

* Node.js - [Download and install Node.js](https://nodejs.org/en/download/);
* Gulp - [Download and install Gulp](http://gulpjs.com/);

Quick install
-------------

The first thing you should do, is install the Node.js dependencies. To install Node.js dependencies you're going to use npm. In your application folder run this in the **command-line**:

> $ npm install:

## Building project
-------------
Before start spotippos application, we need to build .js and .scss files

To build everything, just build with gulp:

    $ gulp build

To build the generated fonts

    $ gulp iconfont

To build everything and keep watching for changed files

    $ gulp watch

Or, simply:

    $ gulp


##  Template engine

> **Handlebars:** provides the power necessary to build semantic templates with a logic-less templating engine that dynamically generates your HTML page.

## Structure

The basic structure of this challenge is given in the following way:

* `spotippos-challenge/`Contains the source code of the front-end challenge.
* `node_modules/` Contains all dependencies fetched via [NPM](https://www.npmjs.org/). However, this directory is unnecessary for versioning, so it is ignored.
* `public/` Contains all the static files you use in your application, this is where you store your front-end files.
* `.gitignore` The .gitignore file specifies intentionally untracked files that Git should ignore.
* `LICENSE` A software license tells others what they can and can't do with your source code.
* `package.json` Lists all [Node.js](http://nodejs.org/) dependencies.
* `README.md` Explains how your application works.
