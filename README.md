# eztz

[![Build Status](https://img.shields.io/travis/HungryCosmos/eztz/master.svg?style=flat-square)](https://travis-ci.org/HungryCosmos/eztz)
[![Coverage Status](https://img.shields.io/coveralls/github/HungryCosmos/eztz/master.svg?style=flat-square)](https://coveralls.io/github/HungryCosmos/eztz)
[![NPM version](https://img.shields.io/npm/v/eztz.svg?style=flat-square)](https://www.npmjs.com/package/eztz)
[![NPM downloads](https://img.shields.io/npm/dm/eztz.svg?style=flat-square)](https://www.npmjs.com/package/eztz)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen wannabee](https://img.shields.io/badge/commitizen-wannabee-yellowgreen.svg)](http://commitizen.github.io/cz-cli/)

I just want to get current date and time in a timezone using ONLY it's offset in hours.
I'm so done looking for proper and 100% valid names.


## About

This tool can do two things:
1. **`get`** - time in any timezone as [Date](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date) knowing only it's [UTC time offset](https://en.wikipedia.org/wiki/List_of_UTC_time_offsets):
   + UTC time: `eztz.get(0)`
   + Almaty time (GMT+6): `eztz.get(+6)`
   + San Francisco time, knowing it's 13h behind Almaty: `eztz.get(-13, timeInAlmaty)`
2. **`diff`** - calcualte time difference (measured in hours) as `number` between two [Date](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date) objects:
   + Time difference between Almaty and UTC: `eztz.diff(timeInAlmaty, timeUtc)`, which returns +6
   + Time difference between Moscow and Almaty: `eztz.diff(timeInMoscow, timeInAlmaty)`, which returns -3

**NOTE**: value returned by this library is just a local date shifted to match the required timezone:  
 ```javascript
 // Prints 6 for me, as my local UTC offset is +6.
 console.log(timeInMoscow.getTimezoneOffset() / -60);
 ```

*However*, [In practice it does the job](https://stackoverflow.com/a/11964609/8722066)
```javascript
console.log(timeInSanFrancisco.toLocaleString());   // 2017-10-27 17:09:06
console.log(timeInAlmaty.toLocaleString());         // 2017-10-28 06:09:06
console.log(timeInMoscow.toLocaleString());         // 2017-10-28 03:09:06
console.log(timeInMoscow.toLocaleString('en-US', {  // Oct 28, 3:09 AM
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute:'numeric',
  hour12: true }));
```

More detailed review of common usecases can be found below, in [Usage section](#usage)   
Some info on [Working Environment](#working-environment)  


## Installation

This package is distributed via npm:
```
npm install eztz
```

And available at npmcdn([https://unpkg.com/](unpkg)):
+ [eztz.js](https://unpkg.com/eztz@1.1.2/dist/umd/eztz.min.js)
+ [eztz.min.js](https://unpkg.com/eztz@1.1.2/dist/umd/eztz.min.js)

Browser-ready:
```html
<script src="https://unpkg.com/eztz@1.1.2/dist/umd/eztz.min.js"></script>
```


## Usage

Read step-by-step guide below, or copy-paste compiled sample in [wiki](https://github.com/HungryCosmos/eztz/wiki)
1. Import
    ```javascript
    var eztz = require('eztz');
    ```

2. Get current time in various timezones, specifying it's [UTC time offset](https://en.wikipedia.org/wiki/List_of_UTC_time_offsets) as first argument  
   2.1. UTC
    ```javascript
    var timeUtc = eztz.get(0);
    ```
   2.2. Pro- way to get UTC date-time
    ```javascript
    var timeUtc = eztz.get();
    ```
   2.3. Almaty (GMT+6)
    ```javascript
    var timeInAlmaty = eztz.get(+6);
    ```
   2.4. Moscow (GMT+3), note that `+` is not necessary, since `+3` is just `3`
    ```javascript
    var timeInMoscow = eztz.get(3);
    ```
   2.5. San Francisco (GMT-7)
    ```javascript
    var timeInSanFrancisco = eztz.get(-7);
    ```
   2.6. India (GMT+5:30). Offset of `5h 30m` is basically `5.5h`
    ```javascript
    var timeInIndia = eztz.get(5.5);
    ```
   2.7. Fictive Time Zone, say GMT+25.852, still works
    ```javascript
    var timeFictive = eztz.get(+25.852);
    ```

3. Time difference in hours between specified Date objects  
   3.1. Calculated basically by substracting right from left
    ```javascript
    var diffFromAlmatyToMoscow = eztz.diff(timeInAlmaty, timeInMoscow);  // +3
    ```
   3.2. Provides negated values if switch places
    ```javascript
    var diffFromMoscowToAlmaty = eztz.diff(timeInMoscow, timeInAlmaty);  // -3
    ```
   3.3. Limits number of decimal places to 1 by default
    ```javascript
    var diffDefault = eztz.diff(timeFictive, timeUtc);       // 25.9
    ```
   3.4. But you can specify it explicitly as third argument
    ```javascript
    var diffDefault = eztz.diff(timeFictive, timeUtc, 1);    // 25.9
    ```
   3.5. And drop decimal part by feeding 0
    ```javascript
    var diffRound = eztz.diff(timeFictive, timeUtc, 0);      // 26
    ```
   3.5. Or get exact value with 3
    ```javascript
    var diffExact = eztz.diff(timeFictive, timeUtc, 3);      // 25.852
    ```
   3.6. Implemented with [Math.round()](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/round)
    ```javascript
    var diffUtcIndia = eztz.diff(timeUtc, timeInIndia, 0);   // -5, not -6
    ```

4. Get date shifted against another [Date](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date)  
   4.1. GMT is 6h behind Almaty
    ```javascript
    var timeGmt = eztz.get(-6, timeInAlmaty);
    ```
   4.2. San Francisco is 13h behind Almaty
    ```javascript
    var timeSanFrancisco = eztz.get(-13, timeInAlmaty);
    ```
   4.3. Moscow is 3h ahead GMT
    ```javascript
    var timeInMoscow = eztz.get(3, timeGmt);    // The same as eztz.get(3)
    ```

5. **NOTE**  
   5.1. Value returned by this library is just a local date shifted to match the required timezone
    ```javascript
    // Prints 6 for me, as my local UTC offset is +6.
    console.log(timeInMoscow.getTimezoneOffset() / -60);
    ```
   5.2. Further manipulation may produce unexpected results, for example [.getTime()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime) should actually return the same value
    ```javascript
    console.log(timeInMoscow.getTime());                // 1509138546929
    console.log(timeInAlmaty.getTime());                // 1509149346929
    ```
6. *However*  
   6.1. [In practice it does the job](https://stackoverflow.com/a/11964609/8722066)
    ```javascript
    console.log(timeInSanFrancisco.toLocaleString());   // 2017-10-27 17:09:06
    console.log(timeInAlmaty.toLocaleString());         // 2017-10-28 06:09:06
    console.log(timeInMoscow.toLocaleString());         // 2017-10-28 03:09:06
    console.log(timeInMoscow.toLocaleString('en-US', {  // Oct 28, 3:09 AM
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute:'numeric',
        hour12: true }));
    ```

[Click to see full compiled usage example in wiki page](https://github.com/HungryCosmos/eztz/wiki)


## Working Environment

Prerequisites:
 + [NodeJS](http://nodejs.org/) >= 4 to build. Current latest version is `8.8.1`, LTS is `6.11.5`  
 + [NodeJS](http://nodejs.org/) >= 8 to use auto-publishing with [semantic-release](https://github.com/semantic-release/semantic-release)  
 + [npm](https://www.npmjs.com/), which usually comes packaged with Node  
 + [git](https://git-scm.com/) command line tool  
 + [github](https://github.com), [travis](https://travis-ci.org), [coveralls](https://coveralls.io) accounts  
 + [npm](https://www.npmjs.com/) account  


## References
This library was developed by [me](https://twitter.com/HungryCosmos) to power up [my github page](https://hungrycosmos.github.io/)  
Thanks to Kent C. Dodds and his series on [starwars-names](https://github.com/kentcdodds/starwars-names)  
