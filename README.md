# eztz

I just want to get current date and time in a timezone using ONLY it's offset in hours.
I'm so done looking for proper and 100% valid names.

## Project Setup

This project assumes you have [NodeJS v6](http://nodejs.org/) or greater installed. You should
also have [npm v3](https://www.npmjs.com/) or greater installed as well (this comes packaged
with Node 6). And you may need a recent version of [git](https://git-scm.com/) just in case.

## Installation

This package is distributed via npm:

```
npm install eztz
```

## Usage

```javascript
var eztz = require('eztz');

var timeAlmaty = eztz.get(+6);          // Javascript Date object containing time of Almaty (GMT +6)
var timeMoscow = eztz.get(3);           // Javascript Date object containing time of Moscow (GMT +3)
var timeSanFrancisco = eztz.get(-7);    // Javascript Date object containing time of San Francisco (GMT -7)
var timeJustForLulz = eztz.get(+28);    // Obviously there is no timezone with such offset, but it still works (GMT +28)
```

## Other
This library was developed by [me](https://twitter.com/HungryCosmos) to power up [my github page](https://hungrycosmos.github.io/)