# log4ui

[![npm version](https://img.shields.io/npm/v/log4ui.svg?style=flat-square)](https://www.npmjs.com/package/log4ui)
[![Build Status](https://travis-ci.org/Mamoru1234/log4ui.svg?branch=master)](https://travis-ci.org/Mamoru1234/log4ui)
[![Coverage Status](https://coveralls.io/repos/github/Mamoru1234/log4ui/badge.svg?branch=master)](https://coveralls.io/github/Mamoru1234/log4ui?branch=master)
[![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg)](https://gitter.im/log4ui)

### Motivation
During development and debugging naturally we are adding a lot of logs of different levels, 
but native console object is not so granular. In other words you do not have any categories, 
labels or some other identifier which allows to enable logs for some module
and disable them for other one.

### Key features
* Categories - split your logs by categories to see only what needed.
* Runtime configuration - all your configuration could be changed in runtime.
This allows to enable logs for some category based on some condition ot using browser console.
* Persistence of configuration - your configuration is persisted using StoreAdapter(localStorage by default).
This allows to you to create personalized configuration without changing source code at all(for example using browser console).
