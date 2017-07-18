# Mileum

[![npm version](https://badge.fury.io/js/mileum.svg)](https://badge.fury.io/js/mileum)
[![Build Status](https://travis-ci.org/CodeMileu/mileum.svg?branch=master)](https://travis-ci.org/CodeMileu/mileum)

Intro
=====

Mileum is an Angular 2 framework intended for **rapid application development**. It's still in Alpha phase but is published on [npm repository](https://badge.fury.io/js/mileum) and can be installed and used. Documentation is being updated as new features are being released.

Installation
============

First add the package to your `package.json` or install it with the following command from terminal:

`npm install --save mileum`

Then simply import the module into your project and add it to your AppModule's imports with `forRoot()`.

```Typescript
import { MileumModule } from 'mileum/module';

@NgModule({
 ...
 imports: [
  MileumModule.forRoot()
 ]
 ...
})
```

You can now use all the features by simply importing them into desired part of your application, check [usage](#usage) for more info on specific features.

Table of contents
=================

  * [Intro](#intro)
  * [Table of contents](#table-of-contents)
  * [Installation](#installation)
  * [Usage](#usage)
    * [Services](#services)
    * [Components](#components)
  * [Tests](#tests)
  * [Dependencies](#dependencies)

Usage
=====

Services
--------

Components
----------

Tests
=====

Dependencies
============


